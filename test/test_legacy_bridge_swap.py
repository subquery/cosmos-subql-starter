import datetime as dt
import decimal
import json
import time
import unittest

from gql import gql

from base_contract import BaseContract
from helpers.field_enums import LegacyBridgeSwapFields


class TestContractSwap(BaseContract):
    amount = decimal.Decimal(10000)
    denom = "atestfet"

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"legacy_bridge_swaps"})

        cls.contract.execute(
            {"swap": {"destination": cls.validator_address}},
            cls.validator_wallet,
            funds=str(cls.amount)+cls.denom
        )

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(12)

    def test_contract_swap(self):
        swap = self.db_cursor.execute(LegacyBridgeSwapFields.select_query()).fetchone()
        self.assertIsNotNone(swap, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(swap[LegacyBridgeSwapFields.destination.value], self.validator_address, "\nDBError: swap sender address does not match")
        self.assertEqual(swap[LegacyBridgeSwapFields.amount.value], self.amount, "\nDBError: fund amount does not match")
        self.assertEqual(swap[LegacyBridgeSwapFields.denom.value], self.denom, "\nDBError: fund denomination does not match")

    def test_retrieve_swap(self):
        result = self.get_latest_block_timestamp()
        time_before = result - dt.timedelta(minutes=5)  # create a second timestamp for five minutes before
        time_before = json.dumps(time_before.isoformat())  # convert both to JSON ISO format
        time_latest = json.dumps(result.isoformat())

        # query legacy bridge swaps, query related block and filter by timestamp, returning all within last five minutes
        query_get_by_range = gql(
            """
            query getByRange {
                legacyBridgeSwaps (
                filter: {
                    block: {
                    timestamp: {
                        greaterThanOrEqualTo: """ + time_before + """,
                                lessThanOrEqualTo: """ + time_latest + """
                            }
                        }
                    }) {
                    nodes {
                        destination
                        amount
                        denom
                    }
                }
            }
            """
        )

        # query bridge swaps, filter by destination address
        query_get_by_address = gql(
            """
            query getByAddress {
                legacyBridgeSwaps (
                filter: {
                    destination: {
                        equalTo:\""""+str(self.validator_address)+"""\"
                    }
                }) {
                    nodes {
                        destination
                        amount
                        denom
                    }
                }
            }
            """
        )

        # query legacy bridge swaps, filter by amount
        query_get_by_amount = gql(
            """
            query getByAmount {
                legacyBridgeSwaps (
                filter: {
                    amount: {
                        greaterThan: "1"
                    }
                }) {
                    nodes {
                        destination
                        amount
                        denom
                    }
                }
            }
            """
        )

        queries = [query_get_by_range, query_get_by_amount, query_get_by_address]
        for query in queries:
            result = self.gql_client.execute(query)
            """
            ["legacyBridgeSwaps"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
            This provides {"destination":destination address, "amount":amount, "denom":denomination}
            which can be destructured for the values of interest.
            """
            swaps = result["legacyBridgeSwaps"]["nodes"]
            self.assertNotEqual(swaps, [], "\nGQLError: No results returned from query")
            self.assertEqual(swaps[0]["destination"], self.validator_address, "\nGQLError: swap destination address does not match")
            self.assertEqual(int(swaps[0]["amount"]), int(self.amount), "\nGQLError: fund amount does not match")
            self.assertEqual(swaps[0]["denom"], self.denom, "\nGQLError: fund denomination does not match")


if __name__ == '__main__':
    unittest.main()
