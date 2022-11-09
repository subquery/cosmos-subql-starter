import sys
from threading import Lock
import unittest
from pathlib import Path
from typing import List

from reactivex.scheduler import ThreadPoolScheduler

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from tests.helpers.clients import TestWithDBConn
from tests.helpers.genesis_data import test_genesis_data, test_bank_state_balances
from src.genesis.helpers.field_enums import NativeBalances

from src.genesis.state import Balance, Coin
from src.genesis.genesis import Genesis
from src.genesis.observers import NativeBalancesObserver, NativeBalancesManager, native_balances_keys_path


class TestNativeBalanceObserver(TestWithDBConn):
    def test_subscribe_to(self) -> None:
        completed = False
        test_genesis = Genesis(**test_genesis_data)
        actual_entries: List[Balance] = []
        expected_entries = [(native_balances_keys_path, Balance(**b)) for
                            b in test_genesis_data["app_state"]["bank"]["balances"]]

        def on_next(balance: Balance):
            actual_entries.append(balance)

        def on_completed():
            nonlocal completed
            completed = True

        test_balance_observer = NativeBalancesObserver(on_next=on_next, on_completed=on_completed)
        test_balance_observer.subscribe_to(test_genesis.source)

        self.assertTrue(completed)
        self.assertListEqual(expected_entries, actual_entries)


class TestBalanceManager(TestWithDBConn):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.truncate_tables("native_balances", cascade=True)
        cls.truncate_tables("accounts", cascade=True)

        with cls.db_conn.cursor() as db:
            # TODO: reference test data rather than more magic string literals
            db.execute("INSERT INTO accounts (id, chain_id) VALUES ('addr123', 'test')")
            db.execute("INSERT INTO accounts (id, chain_id) VALUES ('addr456', 'test')")
            cls.db_conn.commit()

    def test_observe(self):
        expected_balances: List[Balance] = Balance.from_dict_list(test_bank_state_balances)
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
        assert (lock.acquire(True, 5))

    def collect_actual_balances(self):
        actual_balances = []

        with self.db_conn.cursor() as db:
            for address in [b["address"] for b in test_bank_state_balances]:
                balance = Balance(**{"address": address})

                for row in db.execute(NativeBalances.select_where(f"account_id = '{address}'")).fetchall():
                    balance.coins.append(Coin(**{
                        "amount": int(row[NativeBalances.amount.value]),
                        "denom": row[NativeBalances.denom.value],
                    }))

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


if __name__ == "__main__":
    unittest.main()
