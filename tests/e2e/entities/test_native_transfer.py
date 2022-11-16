import datetime as dt
import sys
import time
import unittest
from pathlib import Path

from src.genesis.helpers.field_enums import NativeTransferFields
from tests.helpers.entity_test import EntityTest
from tests.helpers.graphql import test_filtered_query
from tests.helpers.regexes import block_id_regex, msg_id_regex, tx_id_regex

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))


class TestNativeTransfer(EntityTest):
    amount = 5000000
    denom = "atestfet"
    msg_type = "/cosmos.bank.v1beta1.MsgSend"

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"native_transfers"})

        tx = cls.ledger_client.send_tokens(
            cls.delegator_address, cls.amount, cls.denom, cls.validator_wallet
        )
        tx.wait_to_complete()
        cls.assertTrue(tx.response.is_successful(), "TXError: transfer unsuccessful")

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(5)

    def test_native_transfer(self):
        native_transfer = self.db_cursor.execute(
            NativeTransferFields.select_query()
        ).fetchone()
        self.assertIsNotNone(
            native_transfer,
            "\nDBError: table is empty - maybe indexer did not find an entry?",
        )
        self.assertEqual(
            native_transfer[NativeTransferFields.amounts.value][0]["amount"],
            str(self.amount),
            "\nDBError: fund amount does not match",
        )
        self.assertEqual(
            native_transfer[NativeTransferFields.denom.value],
            self.denom,
            "\nDBError: fund denomination does not match",
        )
        self.assertEqual(
            native_transfer[NativeTransferFields.to_address.value],
            self.delegator_address,
            "\nDBError: swap sender address does not match",
        )
        self.assertEqual(
            native_transfer[NativeTransferFields.from_address.value],
            self.validator_address,
            "\nDBError: sender address does not match",
        )

    def test_retrieve_transfer(self):
        result = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (
            result - dt.timedelta(minutes=5)
        ).isoformat()  # convert both to JSON ISO format
        max_timestamp = result.isoformat()

        native_transfer_nodes = """
            {
                id,
                message { id }
                transaction { id }
                block { id }
                amounts
                denom
                toAddress
                fromAddress
            }
            """

        def filtered_native_transfer_query(_filter):
            return test_filtered_query(
                "nativeTransfers", _filter, native_transfer_nodes
            )

        # query native transactions, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_native_transfer_query(
            {
                "block": {
                    "timestamp": {
                        "greaterThanOrEqualTo": min_timestamp,
                        "lessThanOrEqualTo": max_timestamp,
                    }
                }
            }
        )

        # query native transactions, filter by recipient address
        filter_by_to_address_equals = filtered_native_transfer_query(
            {"toAddress": {"equalTo": self.delegator_address}}
        )

        # query native transactions, filter by sender address
        filter_by_from_address_equals = filtered_native_transfer_query(
            {"fromAddress": {"equalTo": self.validator_address}}
        )

        # query native transactions, filter by denomination
        filter_by_denom_equals = filtered_native_transfer_query(
            {"denom": {"equalTo": self.denom}}
        )

        for (name, query) in [
            ("by block timestamp range", filter_by_block_timestamp_range),
            ("by toAddress equals", filter_by_to_address_equals),
            ("by fromAddress equals", filter_by_from_address_equals),
            ("by denom equals", filter_by_denom_equals),
        ]:
            with self.subTest(name):
                result = self.gql_client.execute(query)
                """
                ["nativeTransfers"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
                This provides {"toAddress":address, "fromAddress":address, "denom":denom, "amount":["amount":amount, "denom":denom]}
                which can be destructured for the values of interest.
                """
                native_transfers = result["nativeTransfers"]["nodes"]
                self.assertNotEqual(
                    native_transfers, [], "\nGQLError: No results returned from query"
                )
                self.assertRegex(native_transfers[0]["id"], msg_id_regex)
                self.assertRegex(native_transfers[0]["message"]["id"], msg_id_regex)
                self.assertRegex(native_transfers[0]["transaction"]["id"], tx_id_regex)
                self.assertRegex(native_transfers[0]["block"]["id"], block_id_regex)
                # NB: `amount` is a list of `Coin`s (i.e. [{amount: "", denom: ""}, ...])
                self.assertEqual(
                    int(native_transfers[0]["amounts"][0]["amount"]),
                    self.amount,
                    "\nGQLError: fund amount does not match",
                )
                self.assertEqual(
                    native_transfers[0]["amounts"][0]["denom"],
                    self.denom,
                    "\nGQLError: fund denom does not match",
                )
                self.assertEqual(
                    native_transfers[0]["denom"],
                    self.denom,
                    "\nGQLError: fund denomination does not match",
                )
                self.assertEqual(
                    native_transfers[0]["toAddress"],
                    self.delegator_address,
                    "\nGQLError: destination address does not match",
                )
                self.assertEqual(
                    native_transfers[0]["fromAddress"],
                    self.validator_address,
                    "\nGQLError: from address does not match",
                )


if __name__ == "__main__":
    unittest.main()
