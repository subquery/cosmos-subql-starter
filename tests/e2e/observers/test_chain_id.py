import sys
import unittest
from pathlib import Path

from reactivex.scheduler import ThreadPoolScheduler

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from tests.helpers.genesis_data import test_genesis_data
from src.genesis.genesis import Genesis
from src.genesis.observers import ChainIdObserver


class TestChainIdObserver(unittest.TestCase):
    def test_subscribe_to(self):
        actual_entries = []

        test_genesis = Genesis(**test_genesis_data)
        test_scheduler = ThreadPoolScheduler(2)

        def on_next(chain_id: str):
            actual_entries.append(chain_id)

        def on_completed():
            self.assertEqual(1, len(actual_entries))
            self.assertListEqual([test_genesis_data["chain_id"]], actual_entries)

        test_observer = ChainIdObserver(on_next=on_next, on_completed=on_completed)
        test_observer.subscribe_to(test_genesis.source, scheduler=test_scheduler)


if __name__ == "__main__":
    unittest.main()
