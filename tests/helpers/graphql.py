import json
import re
from typing import Dict

import graphql
from gql import gql

json_keys_regex = re.compile('"(\w+)":')  # noqa: W605


def to_gql(obj: Dict):
    # NB: strip quotes from object keys
    return json_keys_regex.sub("\g<1>:", json.dumps(obj))  # noqa: W605


def filtered_test_query(
    root_entity: str, _filter: Dict, nodes_string: str, _order: str = ""
) -> graphql.DocumentNode:
    filter_string = to_gql(_filter)

    return gql(
        """
    query {
        """
        + root_entity
        + """ (filter: """
        + filter_string
        + """, orderBy: ["""
        + _order
        + """]) {
            nodes """
        + nodes_string
        + """
        }
    }
    """
    )
