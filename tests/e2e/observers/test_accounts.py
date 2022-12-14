import sys
import unittest
from pathlib import Path
from threading import Lock
from typing import List, Tuple
from unittest.mock import patch

from gql import gql
from reactivex.operators import map as map_

from src.genesis.genesis import Genesis
from src.genesis.helpers.field_enums import Accounts
from src.genesis.observers import Account, AccountsManager, AccountsObserver
from src.genesis.state.bank import Balance
from tests.helpers.clients import TestWithDBConn, TestWithGQLClient
from tests.helpers.genesis_data import test_bank_state_balances, test_genesis_data

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))


class TestAccountsObserver(TestWithDBConn):
    def test_subscribe_to(self) -> None:
        test_genesis = Genesis(**test_genesis_data)
        test_chain_id = test_genesis_data["chain_id"]
        actual_entries: List[Account] = []
        lock = Lock()
        lock.acquire()

        expected_entries = [
            Account(id=Balance(**b).address, chain_id=test_chain_id)
            for b in test_genesis_data["app_state"]["bank"]["balances"]
        ]

        def on_next(next_: Tuple[str, any]):
            actual_entries.append(next_)

        def on_completed():
            self.assertEqual(2, len(actual_entries))
            self.assertListEqual(expected_entries, actual_entries)
            lock.release()

        test_accounts_observer = AccountsObserver(
            on_next=on_next, on_completed=on_completed
        )
        test_accounts_observer.subscribe_to(
            test_genesis.source,
            post_operators=[map_(test_accounts_observer.map_account)],
        )

        # Lock returns false if times-out
        assert lock.acquire(True, 5)


class TestAccountsManager(TestWithDBConn, TestWithGQLClient):
    test_manager: AccountsManager
    completed = False
    expected_accounts: List[Account] = [
        Account(id=b["address"], chain_id=test_genesis_data.get("chain_id"))
        for b in test_bank_state_balances
    ]

    @classmethod
    def setUpClass(cls):
        TestWithDBConn().setUpClass()
        TestWithGQLClient().setUpClass()
        cls.truncate_tables("accounts", cascade=True)

        def on_completed():
            cls.completed = True

        cls.completed = False
        cls.test_manager = AccountsManager(cls.db_conn, on_completed=on_completed)
        cls.test_manager.observe(Genesis(**test_genesis_data).source)

    @patch("logging.Logger.warning")
    def test_duplicate(self, logger_warning_mock):
        duplicate_message = "Duplicate account occurred"

        self.completed = False

        def on_completed():
            self.completed = True

        account_manager = AccountsManager(self.db_conn, on_completed=on_completed)
        account_manager.observe(Genesis(**test_genesis_data).source)
        assert self.completed

        assert logger_warning_mock.call_count == 2
        assert duplicate_message in logger_warning_mock.mock_calls[0].args[0]
        assert duplicate_message in logger_warning_mock.mock_calls[1].args[0]

    def test_sql_retrieval(self):
        self.assertTrue(self.completed)

        actual_accounts: List[Account] = []

        with self.db_conn.cursor() as db:
            for row in db.execute(Accounts.select_query()).fetchall():
                actual_accounts.append(
                    Account(
                        id=row[Accounts.id.value], chain_id=row[Accounts.chain_id.value]
                    )
                )

        self.assertListEqual(self.expected_accounts, actual_accounts)

    def test_gql_retrieval(self):
        actual_accounts: List[Account] = []

        results = self.gql_client.execute(
            gql(
                """
            query {
                accounts {
                    nodes {
                        id,
                        chainId,
                    }
                }
            }
        """
            )
        )

        for node in results["accounts"]["nodes"]:
            actual_accounts.append(
                Account(id=node.get("id"), chain_id=node.get("chainId"))
            )

        self.assertListEqual(self.expected_accounts, actual_accounts)


if __name__ == "__main__":
    unittest.main()
