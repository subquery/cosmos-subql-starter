import time
import unittest
from dataclasses import dataclass
from typing import Any, Dict, List, Tuple

import graphql
from cosmpy.aerial.tx_helpers import SubmittedTx
from gql import gql

from src.genesis.helpers.field_enums import Agents, AlmanacRecords, AlmanacRegistrations
from tests.helpers.contracts import AlmanacContract, DefaultAlmanacContractConfig
from tests.helpers.entity_test import EntityTest
from tests.helpers.graphql import filtered_test_query
from tests.helpers.identity import Identity
from tests.helpers.regexes import block_id_regex, msg_id_regex, tx_id_regex


def gql_by_expiry_height(registration_node: Dict) -> int:
    return int(registration_node["expiryHeight"])


def sql_by_expiry_height(registration_row: Tuple) -> int:
    return int(registration_row[AlmanacRegistrations.expiry_height.value])


@dataclass
class Scenario:
    name: str
    query: graphql.DocumentNode
    expected: Any


class TestAlmanac(EntityTest):
    test_registrations_endpoints = [
        "127.0.0.1:9999",
        "127.0.0.1:8888",
        "127.0.0.1:7777",
        "127.0.0.1:6666",
    ]
    submitted_txs: List[SubmittedTx] = []
    expected_registrations: List[Dict] = []
    expected_records: List[Dict] = [
        {
            "service": {
                "protocols": ["grpc"],
                "endpoints": [
                    {
                        "url": endpoint,
                        # NB: not "proper" usage of weight; for testing only
                        "weight": i,
                    }
                ],
            }
        }
        for (i, endpoint) in enumerate(test_registrations_endpoints)
    ]

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"almanac_registrations", "almanac_resolutions"})
        cls._contract = AlmanacContract(cls.ledger_client, cls.validator_wallet)

        # NB: broadcast multiple registrations
        for (i, expected_record) in enumerate(cls.expected_records):
            # Create agent identity
            identity = Identity.from_seed("alice recovery password", i)
            agent_address = str(identity.address)

            # Get sequence
            query_msg = {"query_sequence": {"agent_address": agent_address}}
            sequence = cls._contract.query(query_msg)["sequence"]

            signature = identity.sign_registration(
                contract_address=str(cls._contract.address), sequence=sequence
            )

            tx = cls._contract.execute(
                {
                    "register": {
                        "agent_address": agent_address,
                        "record": expected_record,
                        "sequence": sequence,
                        "signature": signature,
                    }
                },
                cls.validator_wallet,
                funds=DefaultAlmanacContractConfig.register_stake_funds,
            )
            tx.wait_to_complete()
            cls.submitted_txs.append(tx)
            cls.expected_registrations.append(
                {
                    "agentId": agent_address,
                    "expiryHeight": tx.response.height
                    + DefaultAlmanacContractConfig.expiry_height,
                    "sequence": sequence,
                    "signature": signature,
                    "record": expected_record,
                }
            )
        # NB: wait for the indexer
        time.sleep(7)

    def test_registrations_sql(self):
        registrations = self.db_cursor.execute(
            AlmanacRegistrations.select_query()
        ).fetchall()
        actual_reg_length = len(registrations)

        expected_registrations_count = len(self.expected_registrations)
        self.assertEqual(
            expected_registrations_count,
            actual_reg_length,
            f"expected {expected_registrations_count} registrations; got {actual_reg_length}",
        )
        # NB: sort by expiry height so that indexes match
        # their respective scenario.expected index
        list.sort(registrations, key=sql_by_expiry_height)
        for (i, registration) in enumerate(registrations):
            self.assertEqual(
                self.expected_registrations[i]["agentId"],
                registration[AlmanacRegistrations.agent_id.value],
            )
            self.assertLess(
                self.submitted_txs[i].response.height,
                registration[AlmanacRegistrations.expiry_height.value],
            )
            self.assertRegex(registration[AlmanacRegistrations.id.value], msg_id_regex)
            self.assertRegex(
                registration[AlmanacRegistrations.transaction_id.value], tx_id_regex
            )
            self.assertRegex(
                registration[AlmanacRegistrations.block_id.value], block_id_regex
            )

            def matches_expected_record(_record: Dict) -> bool:
                return _record["service"]["endpoints"][0]["weight"] == i

            # Lookup related record
            record = self.db_cursor.execute(
                AlmanacRecords.select_where(
                    f"almanac_records.id = '{registration[AlmanacRegistrations.record_id.value]}'",
                    [AlmanacRecords.get_table(), AlmanacRegistrations.get_table()],
                )
            ).fetchone()
            expected_record = next(
                r for r in self.expected_records if matches_expected_record(r)
            )
            self.assertIsNotNone(record)
            self.assertIsNotNone(expected_record)
            self.assertDictEqual(
                expected_record["service"], record[AlmanacRecords.service.value]
            )
            self.assertRegex(record[AlmanacRecords.id.value], msg_id_regex)
            self.assertRegex(record[AlmanacRecords.transaction_id.value], tx_id_regex)
            self.assertRegex(record[AlmanacRecords.block_id.value], block_id_regex)

            # Lookup related agent
            agent = self.db_cursor.execute(
                Agents.select_where(
                    f"id = '{registration[AlmanacRegistrations.agent_id.value]}'"
                )
            ).fetchone()
            self.assertIsNotNone(agent)

    def test_registrations_gql(self):
        registrations_nodes = """
        {
            id
            expiryHeight
            agentId
            contractId
            record {
                id
                service
                # registrationId
                # eventId
                transactionId
                blockId
            }
            transactionId
            blockId
        }
        """

        last_tx_height = self.submitted_txs[-1].response.height
        expired_registrations_query = filtered_test_query(
            "almanacRegistrations",
            {"expiryHeight": {"lessThanOrEqualTo": str(last_tx_height)}},
            registrations_nodes,
        )

        active_registrations_query = filtered_test_query(
            "almanacRegistrations",
            {"expiryHeight": {"greaterThan": str(last_tx_height)}},
            registrations_nodes,
        )

        all_registrations_query = gql(
            "query {almanacRegistrations {nodes " + registrations_nodes + "}}"
        )

        last_expired_height = (
            last_tx_height - DefaultAlmanacContractConfig.expiry_height
        )
        last_expired = next(
            r for r in self.submitted_txs if r.response.height == last_expired_height
        )
        last_expired_index = self.submitted_txs.index(last_expired)
        scenarios = [
            Scenario(
                name="expired registrations",
                query=expired_registrations_query,
                expected=self.expected_registrations[0 : last_expired_index + 1],
            ),
            Scenario(
                name="active registrations",
                query=active_registrations_query,
                expected=self.expected_registrations[last_expired_index + 1 :],
            ),
            Scenario(
                name="all registrations",
                query=all_registrations_query,
                expected=self.expected_registrations,
            ),
        ]

        for scenario in scenarios:
            with self.subTest(scenario.name):
                gql_result = self.gql_client.execute(scenario.query)
                registrations = gql_result["almanacRegistrations"]["nodes"]
                self.assertEqual(len(scenario.expected), len(registrations))

                # TODO: use respective gql order by when available
                # NB: sort by expiry height so that indexes match
                # their respective scenario.expected index
                list.sort(registrations, key=gql_by_expiry_height)
                self.assertEqual(len(scenario.expected), len(registrations))

                for (i, registration) in enumerate(registrations):
                    self.assertRegex(registration["id"], msg_id_regex)
                    self.assertEqual(
                        scenario.expected[i]["agentId"], registration["agentId"]
                    )
                    self.assertEqual(
                        str(self._contract.address), registration["contractId"]
                    )
                    self.assertEqual(
                        str(scenario.expected[i]["expiryHeight"]),
                        registration["expiryHeight"],
                    )
                    self.assertRegex(registration["transactionId"], tx_id_regex)
                    self.assertRegex(registration["blockId"], block_id_regex)
                    # TODO: assert record equality


if __name__ == "__main__":
    unittest.main()
