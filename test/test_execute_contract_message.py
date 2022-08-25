from gql import gql
from base_contract import BaseContract
import time, unittest, datetime as dt, json


class TestContractExecution(BaseContract):
    amount = '10000'
    denom = "atestfet"
    method = 'swap'
    db_query = 'SELECT contract, method, funds from execute_contract_messages'

    def test_contract_execution(self):
        self.db_cursor.execute('TRUNCATE table execute_contract_messages')
        self.db.commit()
        self.assertFalse(self.db_cursor.execute(self.db_query).fetchall(), "\nDBError: table not empty after truncation")
        self.contract.execute(
            {self.method: {"destination": self.validator_address}},
            self.validator_wallet,
            funds=str(self.amount)+self.denom
        )

        # primitive solution to wait for indexer to observe and handle new tx - TODO: substitute with more robust solution
        time.sleep(12)

        row = self.db_cursor.execute(self.db_query).fetchone()
        self.assertIsNotNone(row, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(row[0], self.contract.address, "\nDBError: contract address does not match")
        self.assertEqual(row[1], self.method, "\nDBError: contract method does not match")
        self.assertEqual(row[2][0]["amount"], self.amount, "\nDBError: fund amount does not match")
        self.assertEqual(row[2][0]["denom"], self.denom, "\nDBError: fund denomination does not match")

    def test_contract_execution_retrieval(self):  # As of now, this test depends on the execution of the previous test in this class.
        result = self.get_latest_block_timestamp()
        time_before = result - dt.timedelta(minutes=5)  # create a second timestamp for five minutes before
        time_before = json.dumps(time_before.isoformat())  # convert both to JSON ISO format
        time_latest = json.dumps(result.isoformat())

        # query execute contract messages, query related block and filter by timestamp, returning all within last five minutes
        query_get_by_range = gql(
            """
            query getByRange {
                executeContractMessages (
                filter: {
                    block: {
                    timestamp: {
                        greaterThanOrEqualTo: """ + time_before + """,
                                lessThanOrEqualTo: """ + time_latest + """
                            }
                        }
                    }) {
                    nodes {
                        contract
                        method
                        funds
                    }
                }
            }
            """
        )

        # query execute contract messages, filter by contract method
        query_get_by_method = gql(
            """
            query getByMethod {
                executeContractMessages (
                filter: {
                    method: {
                        equalTo:\""""+str(self.method)+"""\"
                    }
                }) {
                    nodes {
                        contract
                        method
                        funds
                    }
                }
            }
            """
        )

        queries = [query_get_by_range, query_get_by_method]
        for query in queries:
            result = self.gql_client.execute(query)
            """
            ["executeContractMessages"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
            This provides {"contract":contract address, "method":method, "funds":funds}
            which can be destructured for the values of interest.
            """
            message = result["executeContractMessages"]["nodes"]
            self.assertTrue(message, "\nGQLError: No results returned from query")
            self.assertEqual(message[0]["contract"], self.contract.address, "\nGQLError: contract address does not match")
            self.assertEqual(message[0]["method"], self.method, "\nGQLError: contract method does not match")
            self.assertEqual(int(message[0]["funds"][0]["amount"]), int(self.amount), "\nGQLError: fund amount does not match")
            self.assertEqual(message[0]["funds"][0]["denom"], self.denom, "\nGQLError: fund denomination does not match")


if __name__ == '__main__':
    unittest.main()
