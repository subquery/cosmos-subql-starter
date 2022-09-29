import sys
import unittest
from pathlib import Path
from typing import List, Tuple, Dict

repo_root_path = Path(__file__).parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from src.genesis.state import OwnAttrsMixin


def check_genesis_entries(test_case: unittest.TestCase, expected: List[Tuple[str, any]], actual: List[Tuple[str, any]]):
    for i, entry in enumerate(expected):
        expected_key_paths, expected_value = entry
        actual_key_paths, actual_value = actual[i]

        test_case.assertEqual(expected_key_paths, actual_key_paths)
        test_case.assertEqual(expected_value, actual_value)

    # TODO: check for extra stuff in actual (?)


def check(test_case: unittest.TestCase, expected: any, actual: any):
    if isinstance(actual, OwnAttrsMixin):
        check_attrs(test_case, expected, actual)
        return

    test_case.assertEqual(expected, actual)


def check_dict(test_case: unittest.TestCase, expected: Dict, actual: Dict):
    for k, v in actual.items():
        check(test_case, expected[k], v)


def check_list(test_case: unittest.TestCase, expected: List, actual: List):
    for i, v in enumerate(actual):
        check(test_case, expected[i], v)


def check_attrs(test_case: unittest.TestCase, expected: any, actual: any):
    for attr in actual.attrs:
        # TODO: unworkaround
        if attr == "data":
            expected_attr = expected
        else:
            expected_attr = expected[attr]
        actual_attr = getattr(actual, attr)

        if isinstance(actual_attr, dict):
            check_dict(test_case, expected_attr, actual_attr)

        elif isinstance(actual_attr, list):
            test_case.assertEqual(len(expected_attr), len(actual_attr))
            check_list(test_case, expected_attr, actual_attr)

        elif isinstance(actual_attr, OwnAttrsMixin):
            check_attrs(test_case, expected_attr, actual_attr)

        else:
            test_case.assertEqual(expected_attr, actual_attr)
