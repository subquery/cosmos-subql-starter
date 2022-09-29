import base
import time
import unittest
import grpc
import datetime as dt

from cosmpy.aerial.client import LedgerClient, NetworkConfig

from cosmpy.aerial.wallet import LocalWallet
from cosmpy.protos.ibc.applications.transfer.v1 import tx_pb2, tx_pb2_grpc, query_pb2_grpc, query_pb2 as ibc_query_pb2
from cosmpy.protos.cosmos.base.tendermint.v1beta1 import query_pb2 as tm_query_pb2, query_pb2_grpc as tm_query_pb2_grpc
from cosmpy.protos.ibc.core.client.v1 import client_pb2

from cosmpy.protos.cosmos.base.v1beta1 import coin_pb2
from cosmpy.aerial.client.utils import prepare_and_broadcast_basic_transaction
from cosmpy.aerial.tx import Transaction

from helpers.field_enums import IBCTransferFields
from helpers.graphql import test_filtered_query
from helpers.regexes import msg_id_regex, block_id_regex, tx_id_regex

class TestNativeTransfer(base.Base):
    
    src_ledger_client = None
    dst_ledger_client = None 
    
    src_ibc_tx_client = None
    dst_ibc_tx_client = None
    
    src_ibc_query_client = None

    src_tendermint_client = None
    dst_tendermint_client = None
    
    src_ibc_wallet = None
    dst_ibc_wallet = None
    
    ustake_denom_hash = None

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"ibc_transfers"})

        cls.src_ledger_client = cls.ledger_client

        cls.dst_ledger_client = LedgerClient(NetworkConfig(
            chain_id="wasmchain",
            url=f"grpc+http://{base.WASMD_HOST}:{base.WASMD_GRPC_PORT}",
            fee_minimum_gas_price=1,
            fee_denomination="ustake",
            staking_denomination="ustake",
        ))
        
        cls.src_ibc_wallet = cls.validator_wallet
        cls.dst_ibc_wallet = LocalWallet.from_mnemonic(base.VALIDATOR_MNEMONIC, prefix="wasm")

        src_grpc_cnx = grpc.insecure_channel(f"{base.FETCHD_HOST}:{base.FETCHD_GRPC_PORT}")
        dst_grpc_cnx = grpc.insecure_channel(f"{base.WASMD_HOST}:{base.WASMD_GRPC_PORT}")
        cls.src_ibc_tx_client = tx_pb2_grpc.MsgStub(src_grpc_cnx)
        cls.dst_ibc_tx_client = tx_pb2_grpc.MsgStub(dst_grpc_cnx)
        
        cls.src_ibc_query_client = query_pb2_grpc.QueryStub(src_grpc_cnx)
        
        cls.src_tendermint_client = tm_query_pb2_grpc.ServiceStub(src_grpc_cnx)
        cls.dst_tendermint_client = tm_query_pb2_grpc.ServiceStub(dst_grpc_cnx)
    
    
        latest_src_height = 0
        # make sure the relayer finished setting up the IBC channel 
        while latest_src_height < 30:
            src_latest_block_resp = cls.src_tendermint_client.GetLatestBlock(tm_query_pb2.GetLatestBlockRequest())
            latest_src_height = src_latest_block_resp.block.header.height
            time.sleep(5)
        
        # send atestfet from fetch to wasm chain
        src_to_dst_transfer_msg = tx_pb2.MsgTransfer(
            source_port="transfer",
            source_channel="channel-0",
            token=coin_pb2.Coin(
                denom="atestfet",
                amount="10000"
            ),
            sender=str(cls.src_ibc_wallet.address()),
            receiver=str(cls.dst_ibc_wallet.address()),
            timeout_height=client_pb2.Height(
                revision_number=1,
                revision_height=latest_src_height+10,
            ),
        )
        
        tx = Transaction()
        tx.add_message(src_to_dst_transfer_msg)
        tx = prepare_and_broadcast_basic_transaction(cls.src_ledger_client, tx, cls.src_ibc_wallet)
        tx.wait_to_complete()
        
        # send ustake from wasm to fetch chain
        dst_latest_block_resp = cls.dst_tendermint_client.GetLatestBlock(tm_query_pb2.GetLatestBlockRequest())
        dst_to_src_transfer_msg = tx_pb2.MsgTransfer(
            source_port="transfer",
            source_channel="channel-0",
            token=coin_pb2.Coin(
                denom="ustake",
                amount="7000"
            ),
            sender=str(cls.dst_ibc_wallet.address()),
            receiver=str(cls.src_ibc_wallet.address()),
            timeout_height=client_pb2.Height(
                revision_number=1,
                revision_height=dst_latest_block_resp.block.header.height+10,
            ),
        )
        
        
        tx = Transaction()
        tx.add_message(dst_to_src_transfer_msg)
        tx = prepare_and_broadcast_basic_transaction(cls.dst_ledger_client, tx, cls.dst_ibc_wallet)
        tx.wait_to_complete()
        
        time.sleep(10) # wait 2 blocks for the above transfer to be processed so we can query the denom hash below
        
        # send back some IBC ustake from fetch to wasm chain
        denom_hash_response = cls.src_ibc_query_client.DenomHash(ibc_query_pb2.QueryDenomHashRequest(trace=f"transfer/channel-0/ustake"))
        cls.ustake_denom_hash = f"ibc/{denom_hash_response.hash}"

        src_to_dst_transfer_msg = tx_pb2.MsgTransfer(
            source_port="transfer",
            source_channel="channel-0",
            token=coin_pb2.Coin(
                denom=cls.ustake_denom_hash,
                amount="3000"
            ),
            sender=str(cls.src_ibc_wallet.address()),
            receiver=str(cls.dst_ibc_wallet.address()),
            timeout_height=client_pb2.Height(
                revision_number=1,
                revision_height=latest_src_height+10,
            ),
        )
        
        tx = Transaction()
        tx.add_message(src_to_dst_transfer_msg)
        tx = prepare_and_broadcast_basic_transaction(cls.src_ledger_client, tx, cls.src_ibc_wallet)
        tx.wait_to_complete()
        
        time.sleep(5)
        
    def test_ibc_transfer_db(self):
        # query transfers in DB 
        # must have 2 transfers from fetch1wurz7uwmvchhc8x0yztc7220hxs9jxdjdsrqmn to wasm1wurz7uwmvchhc8x0yztc7220hxs9jxdj53m3s0
        #   - 10000atestfet
        #   - 3000ibc/9B5FB81FDBC0A3A2F707A4B3C217B4E7FF7CB24830F4502D9410D5EA475097D4 (ustake IBC hash)
        
        # TODO: not sure how to handle the 3rd transfers from wasm to fetch, as the tx events seems bugged
        # (the usefull events only present in their b64 version, not decoded properly for some reasons... Seems like an IBC lib bug)
        
        ibc_transfers = self.db_cursor.execute(IBCTransferFields.select_query()).fetchall()
        self.assertIsNotNone(ibc_transfers, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(2, len(ibc_transfers))
        checked_atestfet = False
        checked_ustake = False
        for ibc_transfer in ibc_transfers:
            self.assertEqual(ibc_transfer[IBCTransferFields.to_address.value], str(self.dst_ibc_wallet.address()), "\nDBError: recipient address does not match")
            self.assertEqual(ibc_transfer[IBCTransferFields.from_address.value], self.validator_address, "\nDBError: sender address does not match")

            transfer_amount = ibc_transfer[IBCTransferFields.amount.value]
            if transfer_amount["denom"] == "atestfet":
                self.assertEqual(transfer_amount["amount"], "10000", "\nDBError: amount does not match")
                checked_atestfet = True
            elif transfer_amount["denom"] == self.ustake_denom_hash:
                self.assertEqual(transfer_amount["amount"], "3000", "\nDBError: amount does not match")
                checked_ustake = True
            else:
                self.fail(f"unexpected denom {transfer_amount['denom']}")

        self.assertTrue(checked_atestfet)
        self.assertTrue(checked_ustake)

    def test_ibc_transfer_query(self):
        result = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (result - dt.timedelta(minutes=5)).isoformat()  # convert both to JSON ISO format
        max_timestamp = result.isoformat()

        ibc_transfer_nodes = """
            {
                id,
                message { id }
                transaction { id }
                block { id }
                amount
                denom
                toAddress
                fromAddress
                sourcePort
                sourceChannel
            }
            """

        def filtered_native_transaction_query(_filter):
            return test_filtered_query("ibcTransfers", _filter, ibc_transfer_nodes)

        # query ibc transactions, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_native_transaction_query({
            "block": {
                "timestamp": {
                    "greaterThanOrEqualTo": min_timestamp,
                    "lessThanOrEqualTo": max_timestamp
                }
            }
        })

        # query ibc transactions, filter by recipient address
        filter_by_to_address_equals = filtered_native_transaction_query({
            "toAddress": {
                "equalTo": str(self.dst_ibc_wallet.address())
            }
        })

        # query native transactions, filter by sender address
        filter_by_from_address_equals = filtered_native_transaction_query({
            "fromAddress": {
                "equalTo": str(self.src_ibc_wallet.address())
            }
        })

        for (name, query) in [
            ("by block timestamp range", filter_by_block_timestamp_range),
            ("by toAddress equals", filter_by_to_address_equals),
            ("by fromAddress equals", filter_by_from_address_equals),
        ]:
            with self.subTest(name):
                result = self.gql_client.execute(query)
                ibc_transfers = result["ibcTransfers"]["nodes"]
                self.assertNotEqual(ibc_transfers, [], "\nGQLError: No results returned from query")
                self.assertEqual(2, len(ibc_transfers))
                
                for ibc_transfer in ibc_transfers:
                    self.assertRegex(ibc_transfer["id"], msg_id_regex)
                    self.assertRegex(ibc_transfer["message"]["id"], msg_id_regex)
                    self.assertRegex(ibc_transfer["transaction"]["id"], tx_id_regex)
                    self.assertRegex(ibc_transfer["block"]["id"], block_id_regex)

                    self.assertEqual(ibc_transfer["toAddress"], str(self.dst_ibc_wallet.address()), "\nGQLError: destination address does not match")
                    self.assertEqual(ibc_transfer["fromAddress"], str(self.src_ibc_wallet.address()), "\nGQLError: from address does not match")
                    self.assertNotEqual(ibc_transfer["amount"]["amount"], "", "\nGQLError: amout amount is empty")
                    self.assertNotEqual(ibc_transfer["amount"]["denom"], "", "\nGQLError: amout denom is empty")
                    self.assertNotEqual(ibc_transfer["denom"], "", "\nGQLError: denom is empty")
                    
        self.assertQueryByDenom(ibc_transfer_nodes, 10000, "atestfet")
        self.assertQueryByDenom(ibc_transfer_nodes, 3000, self.ustake_denom_hash)

    def assertQueryByDenom(self, nodes, expected_amount, expected_denom):
        query = test_filtered_query("ibcTransfers", {
            "denom": {
                "equalTo": expected_denom,
            }
        }, nodes)

        result = self.gql_client.execute(query)
        ibc_transfers = result["ibcTransfers"]["nodes"]
        self.assertNotEqual(ibc_transfers, [], "\nGQLError: No results returned from query")
        self.assertRegex(ibc_transfers[0]["id"], msg_id_regex)
        self.assertRegex(ibc_transfers[0]["message"]["id"], msg_id_regex)
        self.assertRegex(ibc_transfers[0]["transaction"]["id"], tx_id_regex)
        self.assertRegex(ibc_transfers[0]["block"]["id"], block_id_regex)

        self.assertEqual(ibc_transfers[0]["toAddress"], str(self.dst_ibc_wallet.address()), "\nGQLError: destination address does not match")
        self.assertEqual(ibc_transfers[0]["fromAddress"], str(self.src_ibc_wallet.address()), "\nGQLError: from address does not match")
        
        self.assertEqual(ibc_transfers[0]["amount"]["amount"], str(expected_amount), "\nGQLError: amount does not match")
        self.assertEqual(ibc_transfers[0]["amount"]["denom"], expected_denom, "\nGQLError: amount denom does not match")
        self.assertEqual(ibc_transfers[0]["denom"], expected_denom, "\nGQLError: denom does not match")

if __name__ == '__main__':
    unittest.main()
