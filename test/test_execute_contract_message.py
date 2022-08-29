import datetime as dt
import json
import time
import unittest

from gql import gql

from base_contract import BaseContract
from helpers.field_enums import ExecuteContractMessageFields


class TestContractExecution(BaseContract):
    amount = '10000'
    denom = "atestfet"
    method = 'swap'

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"execute_contract_messages"})

        cls.contract.execute(
            {cls.method: {"destination": cls.validator_address}},
            cls.validator_wallet,
            funds=str(cls.amount) + cls.denom
        )

        # primitive solution to wait for indexer to observe and handle new tx - TODO: substitute with more robust solution
        time.sleep(12)

    def test_contract_execution(self):
        execMsgs = self.db_cursor.execute(ExecuteContractMessageFields.select_query()).fetchone()
        self.assertIsNotNone(execMsgs, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(execMsgs[ExecuteContractMessageFields.contract.value], self.contract.address, "\nDBError: contract address does not match")
        self.assertEqual(execMsgs[ExecuteContractMessageFields.method.value], self.method, "\nDBError: contract method does not match")
        self.assertEqual(execMsgs[ExecuteContractMessageFields.funds.value][0]["amount"], self.amount, "\nDBError: fund amount does not match")
        self.assertEqual(execMsgs[ExecuteContractMessageFields.funds.value][0]["denom"], self.denom, "\nDBError: fund denomination does not match")

    def test_contract_execution_retrieval(self):  # As of now, this test depends on the execution of the previous test in this class.
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (latest_block_timestamp - dt.timedelta(minutes=5)).isoformat()  # convert both to JSON ISO format
        max_timestamp = json.dumps(latest_block_timestamp.isoformat())

        # query execute contract messages, query related block and filter by timestamp, returning all within last five minutes
        query_get_by_range = gql(
            """
            query getByRange {
                executeContractMessages (
                filter: {
                    block: {
                    timestamp: {
                        greaterThanOrEqualTo: """ + json.dumps(min_timestamp) + """,
                                lessThanOrEqualTo: """ + json.dumps(max_timestamp) + """
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
                        equalTo:\"""" + str(self.method) + """\"
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
            results = self.gql_client.execute(query)
            """
            ["executeContractMessages"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
            This provides {"contract":contract address, "method":method, "funds":funds}
            which can be destructured for the values of interest.
            """
            execMsgs = results["executeContractMessages"]["nodes"]
            self.assertTrue(execMsgs, "\nGQLError: No results returned from query")
            self.assertEqual(execMsgs[0]["contract"], self.contract.address, "\nGQLError: contract address does not match")
            self.assertEqual(execMsgs[0]["method"], self.method, "\nGQLError: contract method does not match")
            self.assertEqual(int(execMsgs[0]["funds"][0]["amount"]), int(self.amount), "\nGQLError: fund amount does not match")
            self.assertEqual(execMsgs[0]["funds"][0]["denom"], self.denom, "\nGQLError: fund denomination does not match")


if __name__ == '__main__':
    unittest.main()
