import sys
import time
import unittest
from pathlib import Path

from gql import gql

from src.genesis.helpers.field_enums import NativeBalanceChangeFields
from tests.helpers.entity_test import EntityTest
from tests.helpers.graphql import filtered_test_query

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))


class TestNativeBalances(EntityTest):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"native_balance_changes"})
        # enough entities are created to verify sorting
        tx = cls.ledger_client.send_tokens(
            cls.delegator_wallet.address(),
            10 * 10 ** 18,
            "atestfet",
            cls.validator_wallet,
        )
        tx.wait_to_complete()
        cls.assertTrue(tx.response.is_successful(), "first set-up tx failed")

        tx = cls.ledger_client.send_tokens(
            cls.validator_wallet.address(),
            3 * 10 ** 18,
            "atestfet",
            cls.delegator_wallet,
        )
        tx.wait_to_complete()
        cls.assertTrue(tx.response.is_successful(), "second set-up tx failed")

        # Wait for subql node to sync
        time.sleep(5)

    def test_account_balance_tracking_db(self):
        events = self.db_cursor.execute(
            NativeBalanceChangeFields.select_query()
        ).fetchall()
        self.assertGreater(len(events), 0)

        total = {
            self.validator_wallet.address(): 0,
            self.delegator_wallet.address(): 0,
        }

        for event in events:
            self.assertTrue(
                (
                    event[NativeBalanceChangeFields.account_id.value]
                    == self.validator_wallet.address()
                    or event[NativeBalanceChangeFields.account_id.value]
                    == self.delegator_wallet.address()
                )
            )
            self.assertNotEqual(
                int(event[NativeBalanceChangeFields.balance_offset.value]), 0
            )
            self.assertEqual(event[NativeBalanceChangeFields.denom.value], "atestfet")

            total[event[NativeBalanceChangeFields.account_id.value]] += event[
                NativeBalanceChangeFields.balance_offset.value
            ]

        # TODO: Represent variable fees in more robust way
        self.assertLessEqual(total[self.validator_wallet.address()], -7 * 10 ** 18)
        self.assertLessEqual(total[self.delegator_wallet.address()], 7 * 10 ** 18)

    def test_account_balance_tracking_query(self):
        query = gql(
            """
            query {
                nativeBalanceChanges{
                    groupedAggregates(groupBy: [ACCOUNT_ID, DENOM]){
                        sum{
                            balanceOffset
                        }
                        keys
                    }
                }
            }
        """
        )

        native_balance_nodes = """
            {
                block {
                    height
                }
            }
        """

        default_filter = {  # filter parameter of helper function must not be null, so instead use rhetorical filter
            "block": {"height": {"greaterThanOrEqualTo": "0"}}
        }

        def filtered_native_balance_query(_filter, order=""):
            return filtered_test_query(
                "nativeBalanceChanges", _filter, native_balance_nodes, _order=order
            )

        order_by_block_height_desc = filtered_native_balance_query(
            default_filter, "NATIVE_BALANCE_CHANGES_BY_BLOCK_HEIGHT_DESC"
        )

        order_by_block_height_asc = filtered_native_balance_query(
            default_filter, "NATIVE_BALANCE_CHANGES_BY_BLOCK_HEIGHT_ASC"
        )

        result = self.gql_client.execute(query)
        validator_balance = 0
        delegator_balance = 0
        for balance in result["nativeBalanceChanges"]["groupedAggregates"]:
            self.assertTrue("atestfet" in balance["keys"])
            if self.validator_address in balance["keys"]:
                validator_balance += int(balance["sum"]["balanceOffset"])
            elif self.delegator_address in balance["keys"]:
                delegator_balance += int(balance["sum"]["balanceOffset"])
            else:
                self.fail("couldn't find validator or delegator address in keys")

        self.assertEqual(validator_balance, -7000000000000092000)
        self.assertEqual(delegator_balance, 6999999999999908000)

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
                native_balance_changes = result["nativeBalanceChanges"]["nodes"]
                last = native_balance_changes[0]["block"]["height"]
                for entry in native_balance_changes:
                    cur = entry["block"]["height"]
                    orderAssert(
                        cur, last, msg="OrderAssertError: order of objects is incorrect"
                    )
                    last = cur


if __name__ == "__main__":
    unittest.main()
