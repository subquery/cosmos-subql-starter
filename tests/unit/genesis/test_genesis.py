import unittest
from http.server import HTTPServer
from threading import Thread
from time import sleep
from typing import List, Tuple

from reactivex import operators

from src.genesis.genesis import Genesis, GenesisSingleton
from src.genesis.state.bank import Balance
from tests.helpers.genesis_data import test_genesis_data
from tests.helpers.http_server import serve_test_data
from tests.helpers.utils import check_attrs, check_genesis_entries


class TestGenesis(unittest.TestCase):
    def test_constructor(self):
        expected_genesis = test_genesis_data
        actual_genesis = Genesis(**test_genesis_data)

        check_attrs(self, expected_genesis, actual_genesis)

    def test_source_subscribe(self):
        completed = False
        test_key_paths = ".app_state.bank.balances"
        actual_genesis = Genesis(**test_genesis_data)
        actual_entries: List[Tuple[str, any]] = []
        expected_entries = [
            (test_key_paths, Balance(**b))
            for b in test_genesis_data["app_state"]["bank"]["balances"]
        ]

        def balances_filter(value: Tuple[str, any]) -> bool:
            key, _ = value
            return key.startswith(test_key_paths)

        def on_next(next_: Tuple[str, any]):
            actual_entries.append(next_)

        def on_completed():
            nonlocal completed
            completed = True

        actual_genesis.source.pipe(operators.filter(balances_filter)).subscribe(
            on_next=on_next, on_completed=on_completed
        )

        self.assertTrue(completed)
        check_genesis_entries(self, expected_entries, actual_entries)


class TestGenesisSingleton(unittest.TestCase):
    server: HTTPServer
    server_thread: Thread
    test_port = 8001

    @classmethod
    def setUpClass(cls) -> None:
        cls.server_thread = Thread(target=serve_test_data, args=(cls,))
        cls.server_thread.start()
        # NB: CI seems to have an issue occasionally
        sleep(1)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.server.shutdown()
        cls.server_thread.join()

    def test_memoization(self):
        expected_genesis = test_genesis_data
        actual_genesis = GenesisSingleton(f"http://localhost:{self.test_port}")

        check_attrs(self, expected_genesis, actual_genesis)


if __name__ == "__main__":
    unittest.main()
