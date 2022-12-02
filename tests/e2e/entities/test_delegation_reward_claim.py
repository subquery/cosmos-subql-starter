import datetime as dt
import re
import sys
import time
import unittest
from pathlib import Path

repo_root_path = Path(__file__).parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from src.genesis.helpers.field_enums import DistDelegatorClaimFields
from tests.helpers.entity_test import EntityTest
from tests.helpers.graphql import test_filtered_query
from tests.helpers.regexes import block_id_regex, msg_id_regex, tx_id_regex


class TestDelegation(EntityTest):
    amount = 100

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"dist_delegator_claims"})

        delegate_tx = cls.ledger_client.delegate_tokens(
            cls.validator_operator_address, cls.amount, cls.validator_wallet
        )
        delegate_tx.wait_to_complete()
        cls.assertTrue(
            delegate_tx.response.is_successful(),
            "\nTXError: delegation tx unsuccessful",
        )

        claim_tx = cls.ledger_client.claim_rewards(
            cls.validator_operator_address, cls.validator_wallet
        )
        claim_tx.wait_to_complete()
        cls.assertTrue(
            claim_tx.response.is_successful(), "\nTXError: reward claim tx unsuccessful"
        )

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(5)

    def test_claim_rewards(self):
        row = self.db_cursor.execute(DistDelegatorClaimFields.select_query()).fetchone()
        self.assertIsNotNone(
            row, "\nDBError: table is empty - maybe indexer did not find an entry?"
        )
        self.assertEqual(
            row[DistDelegatorClaimFields.delegator_address.value],
            self.validator_address,
            "\nDBError: delegation address does not match",
        )
        self.assertEqual(
            row[DistDelegatorClaimFields.validator_address.value],
            self.validator_operator_address,
            "\nDBError: delegation address does not match",
        )

    def test_retrieve_claim(
        self,
    ):  # As of now, this test depends on the execution of the previous test in this class.
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (
            latest_block_timestamp - dt.timedelta(minutes=5)
        ).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        dist_delegate_claim_nodes = """
            {
                id
                message { id }
                transaction { id }
                block { id }
                validatorAddress
                delegatorAddress
                amount
                denom
            }
            """

        def filtered_dist_delegate_claim_query(_filter):
            return test_filtered_query(
                "distDelegatorClaims", _filter, dist_delegate_claim_nodes
            )

        # query governance votes, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_dist_delegate_claim_query(
            {
                "block": {
                    "timestamp": {
                        "greaterThanOrEqualTo": min_timestamp,
                        "lessThanOrEqualTo": max_timestamp,
                    }
                }
            }
        )

        # query delegator reward claims, filter by validator address
        filter_by_validator_equals = filtered_dist_delegate_claim_query(
            {"validatorAddress": {"equalTo": str(self.validator_operator_address)}}
        )

        # query delegator reward claims, filter by delegator address
        filter_by_delegator_equals = filtered_dist_delegate_claim_query(
            {"delegatorAddress": {"equalTo": str(self.validator_address)}}
        )

        for (name, query) in [
            ("by block timestamp range", filter_by_block_timestamp_range),
            ("by validator equals", filter_by_validator_equals),
            ("by delegator equals", filter_by_delegator_equals),
        ]:
            with self.subTest(name):
                result = self.gql_client.execute(query)
                """
                ["distDelegatorClaims"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
                This provides {"delegatorAddress":delegator address, "validatorAddress":validator option}
                which can be destructured for the values of interest.
                """
                claims = result["distDelegatorClaims"]["nodes"]
                self.assertTrue(claims[0], "\nGQLError: No results returned from query")
                self.assertRegex(claims[0]["id"], msg_id_regex)
                self.assertRegex(claims[0]["message"]["id"], msg_id_regex)
                self.assertRegex(claims[0]["transaction"]["id"], tx_id_regex)
                self.assertRegex(claims[0]["block"]["id"], block_id_regex)
                self.assertEqual(
                    claims[0]["delegatorAddress"],
                    self.validator_address,
                    "\nGQLError: delegation address does not match",
                )
                self.assertEqual(
                    claims[0]["validatorAddress"],
                    self.validator_operator_address,
                    "\nGQLError: validator address does not match",
                )
                self.assertRegex(claims[0]["amount"], re.compile("^\d+$"))
                self.assertRegex(claims[0]["denom"], re.compile("^[\w/]{2,127}$"))


if __name__ == "__main__":
    unittest.main()
