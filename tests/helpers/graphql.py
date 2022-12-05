import json
import re

from gql import gql

json_keys_regex = re.compile('"(\w+)":')


def to_gql(obj):
    # NB: strip quotes from object keys
    return json_keys_regex.sub("\g<1>:", json.dumps(obj))


def test_filtered_query(root_entity, _filter, nodes_string, _order=""):
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
