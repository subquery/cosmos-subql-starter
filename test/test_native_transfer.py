import base
import datetime as dt
import json
import time
import unittest

from gql import gql

from helpers.field_enums import NativeTransferFields


class TestNativeTransfer(base.Base):
    amount = 5000000
    denom = "atestfet"
    msg_type = '/cosmos.bank.v1beta1.MsgSend'

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"native_transfers"})

        tx = cls.ledger_client.send_tokens(cls.delegator_address, cls.amount, cls.denom, cls.validator_wallet)
        tx.wait_to_complete()
        cls.assertTrue(tx.response.is_successful(), "TXError: transfer unsuccessful")

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(5)

    def test_native_transfer(self):
        native_transfer = self.db_cursor.execute(NativeTransferFields.select_query()).fetchone()
        self.assertIsNotNone(native_transfer, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(native_transfer[NativeTransferFields.amounts.value][0]['amount'], str(self.amount), "\nDBError: fund amount does not match")
        self.assertEqual(native_transfer[NativeTransferFields.denom.value], self.denom, "\nDBError: fund denomination does not match")
        self.assertEqual(native_transfer[NativeTransferFields.to_address.value], self.delegator_address, "\nDBError: swap sender address does not match")
        self.assertEqual(native_transfer[NativeTransferFields.from_address.value], self.validator_address, "\nDBError: sender address does not match")

    def test_retrieve_transfer(self):  # As of now, this test depends on the execution of the previous test in this class.
        result = self.get_latest_block_timestamp()
        time_before = result - dt.timedelta(minutes=5)  # create a second timestamp for five minutes before
        time_before = json.dumps(time_before.isoformat())  # convert both to JSON ISO format
        time_latest = json.dumps(result.isoformat())

        # query native transactions, query related block and filter by timestamp, returning all within last five minutes
        query_get_by_range = gql(
            """
            query getByRange {
                nativeTransfers (
                filter: {
                    block: {
                    timestamp: {
                        greaterThanOrEqualTo: """ + time_before + """,
                        lessThanOrEqualTo: """ + time_latest + """
                        }
                    }
                }) {
                nodes {
                    denom
                    toAddress
                    fromAddress
                    }
                }
            }
            """
        )

        # query native transactions, filter by recipient address
        query_get_by_to_address = gql(
            """
            query getByToAddress {
                nativeTransfers (
                filter: {
                    toAddress: {
                        equalTo: """+json.dumps(self.delegator_address)+"""
                        }
                    }
                ) {
                nodes {
                    denom
                    toAddress
                    fromAddress
                    }
                }
            }
            """
        )

        # query native transactions, filter by sender address
        query_get_by_from_address = gql(
            """
            query getByFromAddress {
                nativeTransfers (
                filter: {
                    fromAddress: {
                        equalTo: """+json.dumps(self.validator_address)+"""
                        }
                    }
                ) {
                nodes {
                    denom
                    toAddress
                    fromAddress
                    }
                }
            }
            """
        )

        # query native transactions, filter by denomination
        query_get_by_denom = gql(
            """
            query getByDenom {
                nativeTransfers (
                filter: {
                    denom: {
                        equalTo:\""""+self.denom+"""\"
                    }
                }) {
                    nodes {
                        denom
                        toAddress
                        fromAddress
                    }
                }
            }
            """
        )

        queries = [query_get_by_range, query_get_by_to_address, query_get_by_from_address, query_get_by_denom]
        for query in queries:
            result = self.gql_client.execute(query)
            """
            ["nativeTransfers"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
            This provides {"toAddress":address, "fromAddress":address, "denom":denom, "amount":["amount":amount, "denom":denom]}
            which can be destructured for the values of interest.
            """
            native_transfers = result["nativeTransfers"]["nodes"]
            self.assertNotEqual(native_transfers, [], "\nGQLError: No results returned from query")
            self.assertEqual(native_transfers[0]["denom"], self.denom, "\nGQLError: fund denomination does not match")
            self.assertEqual(native_transfers[0]["toAddress"], self.delegator_address, "\nGQLError: destination address does not match")
            self.assertEqual(native_transfers[0]["fromAddress"], self.validator_address, "\nGQLError: from address does not match")


if __name__ == '__main__':
    unittest.main()
