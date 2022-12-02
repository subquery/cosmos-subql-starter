import sys
import time
import unittest
from datetime import datetime, timedelta
from pathlib import Path

from bip_utils import Bip39MnemonicGenerator, Bip39WordsNum
from cosmpy.aerial.client.staking import create_delegate_msg
from cosmpy.aerial.client.utils import prepare_and_broadcast_basic_transaction
from cosmpy.aerial.tx import Transaction
from cosmpy.aerial.wallet import LocalWallet
from cosmpy.protos.cosmos.authz.v1beta1.authz_pb2 import Grant
from cosmpy.protos.cosmos.authz.v1beta1.tx_pb2 import MsgExec, MsgGrant
from cosmpy.protos.cosmos.staking.v1beta1.authz_pb2 import (
    AUTHORIZATION_TYPE_DELEGATE, StakeAuthorization)
from google.protobuf.any_pb2 import Any
from google.protobuf.timestamp_pb2 import Timestamp
from gql import gql

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from src.genesis.helpers.field_enums import (AuthzExecFields,
                                             AuthzExecMessageFields, MsgFields)
from tests.helpers.entity_test import EntityTest
from tests.helpers.regexes import msg_id_regex


class TestAuthzExec(EntityTest):
    test_amount = 5000000
    test_denom = "atestfet"

    expected_msg_type_url = "/cosmos.authz.v1beta1.MsgExec"

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db()

        grantee_mnemonic = Bip39MnemonicGenerator().FromWordsNumber(
            Bip39WordsNum.WORDS_NUM_24
        )
        cls.grantee_wallet = LocalWallet.from_mnemonic(grantee_mnemonic)
        cls.grantee_address = str(cls.grantee_wallet.address())

        """
        TODO: potentially save total time by consolidating `send_tokens`
        calls to fund delegator into `EntityTest.setUpClass`
        """
        # Send some tokens to delegator for staking & fees
        tx = cls.ledger_client.send_tokens(
            cls.delegator_address,
            cls.test_amount * 2,
            cls.test_denom,
            cls.validator_wallet,
        )
        tx.wait_to_complete()

        # Send some tokens to grantee for fees
        tx = cls.ledger_client.send_tokens(
            cls.grantee_address, cls.test_amount, cls.test_denom, cls.validator_wallet
        )
        tx.wait_to_complete()

        # Grant
        expiration = Timestamp()
        expiration.FromDatetime(datetime.now() + timedelta(minutes=5))
        stake_auth = StakeAuthorization(authorization_type=AUTHORIZATION_TYPE_DELEGATE)
        stake_auth.allow_list.address.extend([str(cls.validator_operator_address)])
        authorization_any = Any()
        authorization_any.Pack(stake_auth, "")
        tx = Transaction()
        tx.add_message(
            MsgGrant(
                granter=cls.delegator_address,
                grantee=cls.grantee_address,
                grant=(Grant(authorization=authorization_any, expiration=expiration)),
            )
        )
        tx = prepare_and_broadcast_basic_transaction(
            client=cls.ledger_client,
            tx=tx,
            sender=cls.delegator_wallet,
            account=cls.get_delegator_account(),
        )
        tx.wait_to_complete()

        cls.expected_msgs_len = 5
        # NB - from setUpClass:
        #   + 2 MsgSend
        #   + 1 MsgGrant
        #   + 1 MsgExec + (1 MsgDelegate)

        msg_begin_delegate = create_delegate_msg(
            delegator=cls.delegator_address,
            validator=cls.validator_operator_address,
            amount=str(cls.test_amount),
            denom=cls.test_denom,
        )
        msg_exec_any = Any()
        msg_exec_any.Pack(msg_begin_delegate, "")
        msg_exec = MsgExec(grantee=cls.grantee_address)
        msg_exec.msgs.extend([msg_exec_any])
        tx = Transaction()
        tx.add_message(msg_exec)
        tx = prepare_and_broadcast_basic_transaction(
            client=cls.ledger_client, tx=tx, sender=cls.grantee_wallet
        )
        tx.wait_to_complete()

        # Wait for subql node to sync
        time.sleep(5)

    def test_exec_delegate(self):
        # query DB for messages, authz_execs, & authz_exec_messages
        messages = self.db_cursor.execute(
            MsgFields.select_where(
                f"{MsgFields.type_url.name} = '/cosmos.staking.v1beta1.MsgDelegate'"
            )
        ).fetchall()
        self.assertNotEqual(messages, [])
        self.assertEqual(len(messages), 1)

        authz_execs = self.db_cursor.execute(AuthzExecFields.select_query()).fetchall()
        self.assertNotEqual(authz_execs, [])
        self.assertEqual(len(authz_execs), 1)

        authz_exec_messages = self.db_cursor.execute(
            AuthzExecMessageFields.select_query()
        ).fetchall()
        self.assertNotEqual(authz_exec_messages, [])
        self.assertEqual(len(authz_exec_messages), 1)

        for authz_exec in authz_execs:
            self.assertRegex(authz_exec[AuthzExecFields.id.value], msg_id_regex)
            self.assertEqual(
                authz_exec[AuthzExecFields.grantee.value], self.grantee_address
            )

        for authz_exec_message in authz_exec_messages:
            found_related_message = False
            for message in messages:
                if (
                    message[MsgFields.id.value]
                    == authz_exec_message[AuthzExecFields.message_id.value]
                ):
                    found_related_message = True
                    break
            self.assertTrue(found_related_message)

    def test_blocks_query(self):
        # query DB for authz_messages & authz_sub_messages
        query = gql(
            """
            query {
                messages (filter: {
                    typeUrl: {equalTo: "/cosmos.staking.v1beta1.MsgDelegate"}
                }) {
                    totalCount
                }
                authzExecs {
                    nodes {
                        id
                        grantee
                        subMessages {
                            nodes {
                                message {
                                    id
                                    typeUrl
                                }
                            }
                        }
                    }
                }
            }
        """
        )

        result = self.gql_client.execute(query)
        message_count = result["messages"]["totalCount"]
        self.assertEqual(message_count, 1)

        authz_execs = result["authzExecs"]["nodes"]
        self.assertIsNotNone(authz_execs)
        self.assertEqual(len(authz_execs), 1)

        authz_exec = authz_execs[0]
        self.assertEqual(authz_exec["grantee"], self.grantee_address)

        sub_messages = authz_exec["subMessages"]["nodes"]
        self.assertIsNotNone(authz_execs)
        self.assertEqual(len(authz_execs), 1)

        sub_message = sub_messages[0]
        self.assertEqual(
            sub_message["message"]["typeUrl"], "/cosmos.staking.v1beta1.MsgDelegate"
        )

    # TODO:
    # test_exec_redelegate(self):

    # TODO:
    # test_exec_error(self):

    # TODO:
    # test_exec_hd_keys(self):


if __name__ == "__main__":
    unittest.main()
