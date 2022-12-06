import copy
import sys
import unittest
from pathlib import Path
from threading import Lock
from typing import List
from unittest.mock import patch

import pytest
from reactivex.scheduler import ThreadPoolScheduler

from src.genesis.genesis import Genesis
from src.genesis.helpers.field_enums import NativeBalances
from src.genesis.observers import (
    NativeBalancesManager,
    NativeBalancesObserver,
    native_balances_keys_path,
)
from src.genesis.state import Balance, Coin
from tests.helpers.clients import TestWithDBConn
from tests.helpers.genesis_data import test_bank_state_balances, test_genesis_data

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))


class TestNativeBalanceObserver(TestWithDBConn):
    def test_subscribe_to(self) -> None:
        completed = False
        test_genesis = Genesis(**test_genesis_data)
        actual_entries: List[Balance] = []
        expected_entries = [
            (native_balances_keys_path, Balance(**b))
            for b in test_genesis_data["app_state"]["bank"]["balances"]
        ]

        def on_next(balance: Balance):
            actual_entries.append(balance)

        def on_completed():
            nonlocal completed
            completed = True

        test_balance_observer = NativeBalancesObserver(
            on_next=on_next, on_completed=on_completed
        )
        test_balance_observer.subscribe_to(test_genesis.source)

        self.assertTrue(completed)
        self.assertListEqual(expected_entries, actual_entries)


class TestBalanceManager(TestWithDBConn):
    @classmethod
    def setUpClass(cls):
        TestWithDBConn().setUpClass()
        super().setUpClass()

    @classmethod
    def reinit_db(cls):
        cls.clean_db(["native_balances", "accounts"])

        with cls.db_conn.cursor() as db:
            # TODO: reference test data rather than more magic string literals
            db.execute("INSERT INTO accounts (id, chain_id) VALUES ('addr123', 'test')")
            db.execute("INSERT INTO accounts (id, chain_id) VALUES ('addr456', 'test')")
            cls.db_conn.commit()

    def test_observe(self):
        # Clean DB to prevent interaction with other tests
        self.reinit_db()

        expected_balances: List[Balance] = Balance.from_dict_list(
            test_bank_state_balances
        )
        scheduler = ThreadPoolScheduler(2)
        lock = Lock()
        lock.acquire()

        def on_completed():
            actual_balances: List[Balance] = self.collect_actual_balances()
            self.check_balances(expected_balances, actual_balances)
            lock.release()

        test_manager = NativeBalancesManager(self.db_conn, on_completed=on_completed)
        test_manager.observe(Genesis(**test_genesis_data).source, scheduler=scheduler)

        # Lock returns false if times-out
        assert lock.acquire(True, 5)

    def collect_actual_balances(self):
        actual_balances = []

        with self.db_conn.cursor() as db:
            for address in [b["address"] for b in test_bank_state_balances]:
                balance = Balance(**{"address": address})

                for row in db.execute(
                    NativeBalances.select_where(f"account_id = '{address}'")
                ).fetchall():
                    balance.coins.append(
                        Coin(
                            **{
                                "amount": int(row[NativeBalances.amount.value]),
                                "denom": row[NativeBalances.denom.value],
                            }
                        )
                    )

                actual_balances.append(balance)

        return actual_balances

    def check_balances(self, expected_balances, actual_balances):
        for expected_balance in expected_balances:
            found_balance = False
            actual_balance = None
            for actual_balance_ in actual_balances:
                if actual_balance_.address == expected_balance.address:
                    found_balance = True
                    actual_balance = actual_balance_
                    break

            self.assertTrue(found_balance)
            self.assertEqual(expected_balance.address, actual_balance.address)

            for expected_coin in expected_balance.coins:
                found_coin = False
                actual_coin = None
                for actual_coin_ in actual_balance.coins:
                    if actual_coin_.denom == expected_coin.denom:
                        found_coin = True
                        actual_coin = actual_coin_
                        break

                self.assertTrue(found_coin)
                self.assertEqual(expected_coin, actual_coin)

        # TODO: check for extra stuff in actual_balances (?)

    @patch("logging.Logger.warning")
    def test_observe_with_duplicate_values(self, logger_warning_mock):
        # Clean DB to prevent interaction with other tests
        self.reinit_db()

        duplicate_message = "Duplicate balance occurred"

        # Insert first set of balances to DB
        test_manager = NativeBalancesManager(self.db_conn)
        test_manager.observe(Genesis(**test_genesis_data).source)

        # Try to insert same set again
        second_test_manager = NativeBalancesManager(self.db_conn)
        second_test_manager.observe(Genesis(**test_genesis_data).source)

        n_min_calls = 4
        assert logger_warning_mock.call_count == n_min_calls
        for mock_call in logger_warning_mock.mock_calls:
            assert duplicate_message in mock_call.args[0]

    def test_observe_with_duplicate_values_with_errors(self):
        # Clean DB to prevent interaction with other tests
        self.reinit_db()

        current_bank_state_balances = [
            {
                "address": "addr123",
                "coins": [
                    {"amount": 123, "denom": "a-token"},
                    {"amount": 457, "denom": "b-token"},
                ],
            },
        ]

        # Create variation of test data without overwriting the original dict
        current_test_genesis_data = copy.deepcopy(test_genesis_data)
        current_test_genesis_data["app_state"]["bank"][
            "balances"
        ] = current_bank_state_balances

        # Insert first set of balances to DB
        test_manager = NativeBalancesManager(self.db_conn)
        test_manager.observe(Genesis(**test_genesis_data).source)

        # Insert duplicate entry with different balance
        test_manager = NativeBalancesManager(self.db_conn)

        with pytest.raises(RuntimeError) as e:
            test_manager.observe(Genesis(**current_test_genesis_data).source)
        assert (
            "Balance for addr123-b-token in DB (456) is different from genesis (457)"
            in str(e)
        )


if __name__ == "__main__":
    unittest.main()
