import datetime as dt
import decimal
import time
import unittest

from src.genesis.helpers.field_enums import LegacyBridgeSwapFields
from tests.helpers.contracts import BridgeContract, DefaultBridgeContractConfig
from tests.helpers.entity_test import EntityTest
from tests.helpers.graphql import filtered_test_query


class TestContractSwap(EntityTest):
    amount = decimal.Decimal(10000)
    denom = "atestfet"

    _contract: BridgeContract

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"legacy_bridge_swaps"})
        cls._contract = BridgeContract(
            cls.ledger_client, cls.validator_wallet, DefaultBridgeContractConfig
        )
        cls._contract._store()
        cls._contract._instantiate()
        # repeat entity creation three times to create enough data to verify sorting
        for i in range(3):
            resp = cls._contract.execute(
                {"swap": {"destination": cls.validator_address}},
                cls.validator_wallet,
                funds=str(cls.amount) + cls.denom,
            )
            cls.ledger_client.wait_for_query_tx(resp.tx_hash)
        # extra time required for the indexer to pick up on the transaction
        time.sleep(5)

    def test_contract_swap(self):
        swap = self.db_cursor.execute(LegacyBridgeSwapFields.select_query()).fetchone()
        self.assertIsNotNone(
            swap, "\nDBError: table is empty - maybe indexer did not find an entry?"
        )
        self.assertEqual(
            swap[LegacyBridgeSwapFields.destination.value],
            self.validator_address,
            "\nDBError: swap sender address does not match",
        )
        self.assertEqual(
            swap[LegacyBridgeSwapFields.contract_id.value],
            self._contract.address,
            "\nDBError: contract address does not match",
        )
        self.assertEqual(
            swap[LegacyBridgeSwapFields.amount.value],
            self.amount,
            "\nDBError: fund amount does not match",
        )
        self.assertEqual(
            swap[LegacyBridgeSwapFields.denom.value],
            self.denom,
            "\nDBError: fund denomination does not match",
        )

    def test_retrieve_swap(self):
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (
            latest_block_timestamp - dt.timedelta(minutes=5)
        ).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        legacy_bridge_swap_nodes = """
            {
                id
                destination
                contract {
                    id
                }
                amount
                denom
                executeContractMessage { id }
                message { id }
                transaction { id }
                block {
                    id
                    height
                }
            }
            """

        default_filter = {  # filter parameter of helper function must not be null, so instead use rhetorical filter
            "block": {"height": {"greaterThanOrEqualTo": "0"}}
        }

        def filtered_legacy_bridge_swap_query(_filter, order=""):
            return filtered_test_query(
                "legacyBridgeSwaps", _filter, legacy_bridge_swap_nodes, _order=order
            )

        order_by_block_height_asc = filtered_legacy_bridge_swap_query(
            default_filter, "LEGACY_BRIDGE_SWAPS_BY_BLOCK_HEIGHT_ASC"
        )

        order_by_block_height_desc = filtered_legacy_bridge_swap_query(
            default_filter, "LEGACY_BRIDGE_SWAPS_BY_BLOCK_HEIGHT_DESC"
        )

        # query legacy bridge swaps, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_legacy_bridge_swap_query(
            {
                "block": {
                    "timestamp": {
                        "greaterThanOrEqualTo": min_timestamp,
                        "lessThanOrEqualTo": max_timestamp,
                    }
                }
            }
        )

        # query bridge swaps, filter by destination address
        filter_by_destination_equals = filtered_legacy_bridge_swap_query(
            {"destination": {"equalTo": str(self.validator_address)}}
        )

        # query bridge swaps, filter by contract address
        filter_by_contract_equals = filtered_legacy_bridge_swap_query(
            {"contract": {"id": {"equalTo": str(self._contract.address)}}}
        )

        # query legacy bridge swaps, filter by amount
        filter_by_amount_above = filtered_legacy_bridge_swap_query(
            {"amount": {"greaterThan": "1"}}
        )

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
                self.assertNotEqual(
                    swaps, [], "\nGQLError: No results returned from query"
                )
                self.assertEqual(
                    swaps[0]["destination"],
                    self.validator_address,
                    "\nGQLError: swap destination address does not match",
                )
                self.assertEqual(
                    int(swaps[0]["amount"]),
                    int(self.amount),
                    "\nGQLError: fund amount does not match",
                )
                self.assertEqual(
                    swaps[0]["denom"],
                    self.denom,
                    "\nGQLError: fund denomination does not match",
                )
                self.assertEqual(
                    swaps[0]["contract"]["id"],
                    self._contract.address,
                    "\nGQLError: contract address does not match",
                )

        for (name, query, orderAssert) in (
            (
                "order by block height ascending",
                order_by_block_height_asc,
                self.assertGreaterEqual,
            ),
            (
                "order by block height descending",
                order_by_block_height_desc,
                self.assertLessEqual,
            ),
        ):
            with self.subTest(name):
                result = self.gql_client.execute(query)
                legacy_bridge_swaps = result["legacyBridgeSwaps"]["nodes"]
                last = legacy_bridge_swaps[0]["block"]["height"]
                for entry in legacy_bridge_swaps:
                    cur = entry["block"]["height"]
                    orderAssert(
                        cur, last, msg="OrderAssertError: order of objects is incorrect"
                    )
                    last = cur


if __name__ == "__main__":
    unittest.main()
