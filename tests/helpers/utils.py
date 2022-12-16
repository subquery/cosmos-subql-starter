import unittest
from typing import Any, Dict, List, Tuple

from src.genesis.state import OwnAttrsMixin


def check_genesis_entries(
    test_case: unittest.TestCase,
    expected: List[Tuple[str, Any]],
    actual: List[Tuple[str, Any]],
):
    for i, entry in enumerate(expected):
        expected_key_paths, expected_value = entry
        actual_key_paths, actual_value = actual[i]

        test_case.assertEqual(expected_key_paths, actual_key_paths)
        test_case.assertEqual(expected_value, actual_value)

    # TODO: check for extra stuff in actual (?)


def check(test_case: unittest.TestCase, expected: Any, actual: Any):
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


def check_attrs(test_case: unittest.TestCase, expected: Any, actual: Any):
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
