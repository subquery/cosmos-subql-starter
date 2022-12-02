import sys
import time
import unittest
from pathlib import Path
from threading import Lock

from reactivex.scheduler import ThreadPoolScheduler

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from src.genesis.genesis import Genesis
from src.genesis.observers import ChainIdObserver
from tests.helpers.genesis_data import test_genesis_data


class TestChainIdObserver(unittest.TestCase):
    def test_subscribe_to(self):
        actual_entries = []

        on_next_lock = Lock()
        on_completed_lock = Lock()

        on_next_lock.acquire()
        on_completed_lock.acquire()

        test_genesis = Genesis(**test_genesis_data)
        test_scheduler = ThreadPoolScheduler(2)

        def on_next(chain_id: str):
            actual_entries.append(chain_id)
            on_next_lock.release()

        def on_completed():
            self.assertEqual(1, len(actual_entries))
            self.assertListEqual([test_genesis_data["chain_id"]], actual_entries)
            on_completed_lock.release()

        test_observer = ChainIdObserver(on_next=on_next, on_completed=on_completed)
        test_observer.subscribe_to(test_genesis.source, scheduler=test_scheduler)
        assert on_next_lock.acquire(True, 1)
        assert on_completed_lock.acquire(True, 1)


if __name__ == "__main__":
    unittest.main()
