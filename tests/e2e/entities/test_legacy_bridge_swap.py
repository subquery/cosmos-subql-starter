import datetime as dt
import decimal
import sys
import unittest
import time
from pathlib import Path

repo_root_path = Path(__file__).parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from tests.helpers.contracts import BridgeContract, DefaultBridgeContractConfig
from tests.helpers.entity_test import EntityTest
from tests.helpers.field_enums import LegacyBridgeSwapFields
from tests.helpers.graphql import test_filtered_query


class TestContractSwap(EntityTest):
    amount = decimal.Decimal(10000)
    denom = "atestfet"

    _contract: BridgeContract
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"legacy_bridge_swaps"})

        cls._contract = BridgeContract(cls.ledger_client, cls.validator_wallet, DefaultBridgeContractConfig)
        resp = cls._contract.execute(
            {"swap": {"destination": cls.validator_address}},
            cls.validator_wallet,
            funds=str(cls.amount)+cls.denom
        )
        cls.ledger_client.wait_for_query_tx(resp.tx_hash)
        time.sleep(5) # stil need to give some extra time for the indexer to pickup the tx

    def test_contract_swap(self):
        swap = self.db_cursor.execute(LegacyBridgeSwapFields.select_query()).fetchone()
        self.assertIsNotNone(swap, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(swap[LegacyBridgeSwapFields.destination.value], self.validator_address, "\nDBError: swap sender address does not match")
        self.assertEqual(swap[LegacyBridgeSwapFields.contract.value], self._contract.address, "\nDBError: contract address does not match")
        self.assertEqual(swap[LegacyBridgeSwapFields.amount.value], self.amount, "\nDBError: fund amount does not match")
        self.assertEqual(swap[LegacyBridgeSwapFields.denom.value], self.denom, "\nDBError: fund denomination does not match")

    def test_retrieve_swap(self):
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (latest_block_timestamp - dt.timedelta(minutes=5)).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        legacy_bridge_swap_nodes = """
            {
                id
                destination
                contract
                amount
                denom
                executeContractMessage { id }
                message { id }
                transaction { id }
                block { id }
            }
            """

        def filtered_legacy_bridge_swap_query(_filter):
            return test_filtered_query("legacyBridgeSwaps", _filter, legacy_bridge_swap_nodes)

        # query legacy bridge swaps, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_legacy_bridge_swap_query({
            "block": {
                "timestamp": {
                    "greaterThanOrEqualTo": min_timestamp,
                    "lessThanOrEqualTo": max_timestamp
                }
            }
        })

        # query bridge swaps, filter by destination address
        filter_by_destination_equals = filtered_legacy_bridge_swap_query({
            "destination": {
                "equalTo": str(self.validator_address)
            }
        })
        
        # query bridge swaps, filter by contract address
        filter_by_contract_equals = filtered_legacy_bridge_swap_query({
            "contract": {
                "equalTo": str(self._contract.address)
            }
        })

        # query legacy bridge swaps, filter by amount
        filter_by_amount_above = filtered_legacy_bridge_swap_query({
            "amount": {
                "greaterThan": "1"
            }
        })

        for (name, query) in [
            ("by block timestamp range", filter_by_block_timestamp_range),
            ("by amount above", filter_by_amount_above),
            ("by destination equals", filter_by_destination_equals),
            ("by contract equals", filter_by_contract_equals),
        ]:
            with self.subTest(name):
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
