from cosmpy.aerial.contract import LedgerContract
from gql import gql
import time, unittest, os, requests, base, decimal, datetime as dt, json


class TestContractSwap(base.Base):
    contract = None
    amount = decimal.Decimal(10000)
    denom = "atestfet"
    db_query = 'SELECT destination, amount, denom from legacy_bridge_swaps'

    def setUp(self):
        url = "https://github.com/fetchai/fetch-ethereum-bridge-v1/releases/download/v0.2.0/bridge.wasm"
        if not os.path.exists("../.contract"):
            os.mkdir("../.contract")
        try:
            temp = open("../.contract/bridge.wasm", "rb")
            temp.close()
        except:
            contract_request = requests.get(url)
            file = open("../.contract/bridge.wasm", "wb").write(contract_request.content)

        self.contract = LedgerContract("../.contract/bridge.wasm", self.ledger_client)

        # TODO: avoid deploying with every test run
        # Instead, query for active contract and skip if found.

        self.contract.deploy(
            {"cap": "250000000000000000000000000",
             "reverse_aggregated_allowance": "3000000000000000000000000",
             "reverse_aggregated_allowance_approver_cap": "3000000000000000000000000",
             "lower_swap_limit": "1",
             "upper_swap_limit": "1000000000000000000000000",
             "swap_fee": "0",
             "paused_since_block": 18446744073709551615,
             "denom": "atestfet",
             "next_swap_id": 0
             },
            self.validator_wallet
        )

    def test_contract_swap(self):
        self.db_cursor.execute('TRUNCATE table legacy_bridge_swaps')
        self.db.commit()
        self.assertFalse(self.db_cursor.execute(self.db_query).fetchall(), "\nDBError: table not empty after truncation")

        self.contract.execute(
            {"swap": {"destination": self.validator_address}},
            self.validator_wallet,
            funds=str(self.amount)+self.denom
        )

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(12)

        row = self.db_cursor.execute(self.db_query).fetchone()
        self.assertIsNotNone(row, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(row[0], self.validator_address, "\nDBError: swap sender address does not match")
        self.assertEqual(row[1], self.amount, "\nDBError: fund amount does not match")
        self.assertEqual(row[2], self.denom, "\nDBError: fund denomination does not match")

    def test_retrieve_swap(self):  # As of now, this test depends on the execution of the previous test in this class.
        result = self.get_latest_block_timestamp()
        time_before = result - dt.timedelta(minutes=5)  # create a second timestamp for five minutes before
        time_before = json.dumps(time_before.isoformat())  # convert both to JSON ISO format
        time_latest = json.dumps(result.isoformat())

        # query legacy bridge swaps, query related block and filter by timestamp, returning all within last five minutes
        query_get_by_range = gql(
            """
            query blocker {
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

        # query bridge swaps, filter by destination address - TODO: match correct 'destination' address
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
            message = result["legacyBridgeSwaps"]["nodes"]
            self.assertTrue(message, "\nGQLError: No results returned from query")
            self.assertEqual(message[0]["destination"], self.validator_address, "\nGQLError: swap destination address does not match")
            self.assertEqual(int(message[0]["amount"]), int(self.amount), "\nGQLError: fund amount does not match")
            self.assertEqual(message[0]["denom"], self.denom, "\nGQLError: fund denomination does not match")


if __name__ == '__main__':
    unittest.main()
