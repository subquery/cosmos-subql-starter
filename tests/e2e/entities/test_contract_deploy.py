import datetime as dt
import sys
import time
import unittest
from pathlib import Path

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from src.genesis.helpers.field_enums import (ContractFields,
                                             InstantiateMessageFields,
                                             StoreMessageFields)
from tests.helpers.contracts import DeployTestContract
from tests.helpers.entity_test import EntityTest
from tests.helpers.graphql import test_filtered_query


class TestContractDeploy(EntityTest):
    amount = 5000
    _contract: DeployTestContract

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"contracts"})
        cls._contract = DeployTestContract(cls.ledger_client, cls.validator_wallet)
        cls.entities = {
            "storeContractMsg": {
                "query": StoreMessageFields.select_query(),
                "equal": {
                    StoreMessageFields.sender.value: cls.validator_address,
                    StoreMessageFields.code_id.value: cls._contract.code_id,
                    StoreMessageFields.permission.value: None,
                },
                "not_null": {},
            },
            "instantiateMsg": {
                "query": InstantiateMessageFields.select_query(),
                "equal": {
                    InstantiateMessageFields.sender.value: cls.validator_address,
                    InstantiateMessageFields.code_id.value: cls._contract.code_id,
                    InstantiateMessageFields.admin.value: "",
                    InstantiateMessageFields.funds.value: [],
                },
                "not_null": {
                    InstantiateMessageFields.label.value,
                    InstantiateMessageFields.payload.value,
                },
            },
            "contractEntity": {
                "query": ContractFields.select_query(),
                "equal": {ContractFields.interfaces.value: "{CW20}"},
                "not_null": {
                    ContractFields.instantiate_message_id.value,
                    ContractFields.store_message_id.value,
                },
            },
        }
        time.sleep(5)

    def test_execute_transfer(self):
        for entity in ["storeContractMsg", "instantiateMsg", "contractEntity"]:
            transfer = self.db_cursor.execute(self.entities[entity]["query"]).fetchone()
            self.assertIsNotNone(
                transfer,
                "\nDBError: table is empty - maybe indexer did not find an entry?",
            )

            for assertion_key in self.entities[entity]["equal"]:
                self.assertEqual(
                    transfer[assertion_key],
                    self.entities[entity]["equal"][assertion_key],
                    f"DBError: `{entity}` attribute not equal",
                )

            for assertion_key in self.entities[entity]["not_null"]:
                self.assertIsNotNone(
                    transfer[assertion_key], f"DBError: `{entity}` attribute not null"
                )

    def test_retrieve_store_contract_msg(self):
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (
            latest_block_timestamp - dt.timedelta(minutes=5)
        ).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        store_contract_nodes = """
            {
                id
                sender
                permission
                codeId
                message { id }
                transaction { id }
                block { id }
            }
            """

        def filtered_store_contract_message_query(_filter):
            return test_filtered_query(
                "storeContractMessages", _filter, store_contract_nodes
            )

        # query store contract messages, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_store_contract_message_query(
            {
                "block": {
                    "timestamp": {
                        "greaterThanOrEqualTo": min_timestamp,
                        "lessThanOrEqualTo": max_timestamp,
                    }
                }
            }
        )

        # query store contract messages, filter by sender address
        filter_by_sender_equals = filtered_store_contract_message_query(
            {"sender": {"equalTo": str(self.validator_address)}}
        )

        # query store contract messages, filter by permission
        filter_by_permission_equals = filtered_store_contract_message_query(
            {"permission": {"isNull": True}}
        )

        # query store contract messages, filter by codeId
        filter_by_code_id_equals = filtered_store_contract_message_query(
            {"codeId": {"equalTo": self._contract.code_id}}
        )

        for (name, query) in [
            ("by block timestamp range", filter_by_block_timestamp_range),
            ("by sender equals", filter_by_sender_equals),
            ("by permission equals", filter_by_permission_equals),
            ("by code_id equals", filter_by_code_id_equals),
        ]:
            with self.subTest(name):
                result = self.gql_client.execute(query)
                """
                ["storeContractMessages"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
                This provides {"sender":sender address, "permission: access type enum, "codeId": code ID}
                which can be destructured for the values of interest.
                """
                transfer = result["storeContractMessages"]["nodes"]
                self.assertNotEqual(
                    transfer, [], "\nGQLError: No results returned from query"
                )
                self.assertEqual(
                    transfer[0]["sender"],
                    self.validator_address,
                    "\nGQLError: sender address does not match",
                )
                self.assertEqual(
                    transfer[0]["permission"],
                    None,
                    "\nGQLError: contract permission does not match",
                )
                self.assertEqual(
                    int(transfer[0]["codeId"]),
                    self._contract.code_id,
                    "\nGQLError: code_id does not match",
                )

    def test_retrieve_instantiate_contract_msg(self):
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (
            latest_block_timestamp - dt.timedelta(minutes=5)
        ).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        instantiate_contract_nodes = """
            {
                id
                sender
                admin
                codeId
                label
                payload
                funds
                message { id }
                transaction { id }
                block { id }
            }
            """

        def filtered_instantiate_contract_message_query(_filter):
            return test_filtered_query(
                "instantiateContractMessages", _filter, instantiate_contract_nodes
            )

        # query instantiate contract messages, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_instantiate_contract_message_query(
            {
                "block": {
                    "timestamp": {
                        "greaterThanOrEqualTo": min_timestamp,
                        "lessThanOrEqualTo": max_timestamp,
                    }
                }
            }
        )

        # query instantiate contract messages, filter by sender address
        filter_by_sender_equals = filtered_instantiate_contract_message_query(
            {"sender": {"equalTo": str(self.validator_address)}}
        )

        # query instantiate contract messages, filter by admin
        filter_by_admin_equals = filtered_instantiate_contract_message_query(
            {"admin": {"equalTo": ""}}
        )

        # query instantiate contract messages, filter by codeId
        filter_by_code_id_equals = filtered_instantiate_contract_message_query(
            {"codeId": {"equalTo": self._contract.code_id}}
        )

        # query instantiate contract messages, filter by label
        filter_by_label_equals = filtered_instantiate_contract_message_query(
            {"label": {"isNull": False}}
        )

        # query instantiate contract messages, filter by payload
        filter_by_payload_equals = filtered_instantiate_contract_message_query(
            {"payload": {"isNull": False}}
        )

        # query instantiate contract messages, filter by funds
        filter_by_funds_equals = filtered_instantiate_contract_message_query(
            {"funds": {"equalTo": []}}
        )

        for (name, query) in [
            ("by block timestamp range", filter_by_block_timestamp_range),
            ("by sender equals", filter_by_sender_equals),
            ("by admin equals", filter_by_admin_equals),
            ("by code_id equals", filter_by_code_id_equals),
            ("by label not null", filter_by_label_equals),
            ("by payload not null", filter_by_payload_equals),
            ("by funds equals", filter_by_funds_equals),
        ]:
            with self.subTest(name):
                result = self.gql_client.execute(query)
                """
                ["instantiateContractMessages"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
                This provides {"sender":sender address, "admin: contract admin, "codeId": code ID, "label": contract label,
                "payload": contract configuration/payload, "funds": funds held within contract}
                which can be destructured for the values of interest.
                """
                transfer = result["instantiateContractMessages"]["nodes"]
                self.assertNotEqual(
                    transfer, [], "\nGQLError: No results returned from query"
                )
                self.assertEqual(
                    transfer[0]["sender"],
                    self.validator_address,
                    "\nGQLError: sender address does not match",
                )
                self.assertEqual(
                    transfer[0]["admin"],
                    "",
                    "\nGQLError: contract admin does not match",
                )
                self.assertEqual(
                    int(transfer[0]["codeId"]),
                    self._contract.code_id,
                    "\nGQLError: contract code_id does not match",
                )
                self.assertIsNotNone(
                    transfer[0]["label"], "\nGQLError: contract label is empty"
                )
                self.assertIsNotNone(
                    transfer[0]["payload"], "\nGQLError: contract payload is empty"
                )
                self.assertEqual(
                    transfer[0]["funds"], [], "\nGQLError: contract funds do not match"
                )

    def test_retrieve_contract(self):
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (
            latest_block_timestamp - dt.timedelta(minutes=5)
        ).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        store_contract_nodes = """
            {
                id
                interfaces
                storeMessage { id }
                instantiateMessage { id }
            }
            """

        def filtered_contract_query(_filter):
            return test_filtered_query("contracts", _filter, store_contract_nodes)

        # query contract, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_contract_query(
            {
                "storeMessage": {
                    "block": {
                        "timestamp": {
                            "greaterThanOrEqualTo": min_timestamp,
                            "lessThanOrEqualTo": max_timestamp,
                        }
                    }
                }
            }
        )

        # query contract, filter by contract address
        filter_by_id_equals = filtered_contract_query(
            {"id": {"equalTo": str(self._contract.address)}}
        )

        # query contract, filter by interfaces
        filter_by_interfaces_equals = filtered_contract_query(
            {"interfaces": {"isNull": False}}
        )

        for (name, query) in [
            ("by block timestamp range", filter_by_block_timestamp_range),
            ("by id equals", filter_by_id_equals),
            ("by interfaces equals", filter_by_interfaces_equals),
        ]:
            with self.subTest(name):
                result = self.gql_client.execute(query)
                """
                ["contracts"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
                This provides {"id":contract address, "interfaces: predicted contract interface}
                which can be destructured for the values of interest.
                """
                transfer = result["contracts"]["nodes"]
                self.assertNotEqual(
                    transfer, [], "\nGQLError: No results returned from query"
                )
                self.assertEqual(
                    transfer[0]["id"],
                    str(self._contract.address),
                    "\nGQLError: contract address does not match",
                )
                self.assertIsNotNone(
                    transfer[0]["interfaces"],
                    "\nGQLError: contract interface prediction is null",
                )


if __name__ == "__main__":
    unittest.main()
