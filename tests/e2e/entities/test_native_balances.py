import sys
import time
import unittest
from pathlib import Path

from gql import gql

from src.genesis.helpers.field_enums import NativeBalanceChangeFields
from tests.helpers.entity_test import EntityTest

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))


class TestNativeBalances(EntityTest):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"native_balance_changes"})

        tx = cls.ledger_client.send_tokens(
            cls.delegator_wallet.address(),
            10 * 10**18,
            "atestfet",
            cls.validator_wallet,
        )
        tx.wait_to_complete()
        cls.assertTrue(tx.response.is_successful(), "first set-up tx failed")

        tx = cls.ledger_client.send_tokens(
            cls.validator_wallet.address(),
            3 * 10**18,
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
        self.assertLessEqual(total[self.validator_wallet.address()], -7 * 10**18)
        self.assertLessEqual(total[self.delegator_wallet.address()], 7 * 10**18)

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

        self.assertLessEqual(validator_balance, -7 * 10**18)
        self.assertLessEqual(delegator_balance, 7 * 10**18)


if __name__ == "__main__":
    unittest.main()
