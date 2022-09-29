import datetime as dt
import json
import sys
import time
import unittest
from pathlib import Path

from gql import gql

repo_root_path = Path(__file__).parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from tests.helpers.contracts import BridgeContract, Cw20Contract, DefaultBridgeContractConfig
from tests.helpers.field_enums import ExecuteContractMessageFields
from tests.helpers.entity_test import EntityTest


class TestContractExecution(EntityTest):
    amount = '10000'
    denom = "atestfet"
    method = 'swap'

    _contract: BridgeContract

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"execute_contract_messages"})

        cls._contract = BridgeContract(cls.ledger_client, cls.validator_wallet, DefaultBridgeContractConfig)
        resp = cls._contract.execute(
            {cls.method: {"destination": cls.validator_address}},
            cls.validator_wallet,
            funds=str(cls.amount) + cls.denom
        )
        cls.ledger_client.wait_for_query_tx(resp.tx_hash)
        time.sleep(5) # stil need to give some extra time for the indexer to pickup the tx

    def test_contract_execution(self):
        execMsgs = self.db_cursor.execute(ExecuteContractMessageFields.select_query()).fetchone()
        self.assertIsNotNone(execMsgs, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(execMsgs[ExecuteContractMessageFields.contract.value], self._contract.address, "\nDBError: contract address does not match")
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
            self.assertEqual(execMsgs[0]["contract"], self._contract.address, "\nGQLError: contract address does not match")
            self.assertEqual(execMsgs[0]["method"], self.method, "\nGQLError: contract method does not match")
            self.assertEqual(int(execMsgs[0]["funds"][0]["amount"]), int(self.amount), "\nGQLError: fund amount does not match")
            self.assertEqual(execMsgs[0]["funds"][0]["denom"], self.denom, "\nGQLError: fund denomination does not match")


if __name__ == '__main__':
    unittest.main()
