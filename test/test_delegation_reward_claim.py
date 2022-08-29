import datetime as dt
import json
import time
import unittest

from gql import gql

import base
from helpers.field_enums import DistDelegatorClaimFields


class TestDelegation(base.Base):
    amount = 100

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"dist_delegator_claims"})

        delegate_tx = cls.ledger_client.delegate_tokens(cls.validator_operator_address, cls.amount, cls.validator_wallet)
        delegate_tx.wait_to_complete()
        cls.assertTrue(delegate_tx.response.is_successful(), "\nTXError: delegation tx unsuccessful")

        claim_tx = cls.ledger_client.claim_rewards(cls.validator_operator_address, cls.validator_wallet)
        claim_tx.wait_to_complete()
        cls.assertTrue(claim_tx.response.is_successful(), "\nTXError: reward claim tx unsuccessful")

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(5)

    def test_claim_rewards(self):
        row = self.db_cursor.execute(DistDelegatorClaimFields.select_query()).fetchone()
        self.assertIsNotNone(row, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(row[DistDelegatorClaimFields.delegator_address.value], self.validator_address, "\nDBError: delegation address does not match")
        self.assertEqual(row[DistDelegatorClaimFields.validator_address.value], self.validator_operator_address, "\nDBError: delegation address does not match")

    def test_retrieve_claim(self):  # As of now, this test depends on the execution of the previous test in this class.
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (latest_block_timestamp - dt.timedelta(minutes=5)).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        # query governance votes, query related block and filter by timestamp, returning all within last five minutes
        query_by_timestamp = gql(
            """
            query get_votes_by_timestamp {
                distDelegatorClaims (
                filter: {
                    block: {
                    timestamp: {
                        greaterThanOrEqualTo: """ + json.dumps(min_timestamp) + """,
                                lessThanOrEqualTo: """ + json.dumps(max_timestamp) + """
                            }
                        }
                    }) {
                    nodes {
                        transactionId
                        validatorAddress
                        delegatorAddress
                    }
                }
            }
            """
        )

        # query delegator reward claims, filter by validator address
        query_by_validator = gql(
            """
            query getByValidator {
                distDelegatorClaims (
                filter: {
                    validatorAddress: { 
                        equalTo:\"""" + str(self.validator_operator_address) + """\"
                    }
                }) {
                    nodes {
                        transactionId
                        validatorAddress
                        delegatorAddress
                    }
                }
            }
            """
        )

        # query delegator reward claims, filter by delegator address
        query_by_delegator = gql(
            """
            query getByValidator {
                distDelegatorClaims (
                filter: {
                    delegatorAddress: { 
                        equalTo:\"""" + str(self.validator_address) + """\"
                    }
                }) {
                    nodes {
                        transactionId
                        validatorAddress
                        delegatorAddress
                    }
                }
            }
            """
        )

        queries = [query_by_timestamp, query_by_validator, query_by_delegator]
        for query in queries:
            result = self.gql_client.execute(query)
            """
            ["distDelegatorClaims"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
            This provides {"delegatorAddress":delegator address, "validatorAddress":validator option}
            which can be destructured for the values of interest.
            """
            message = result["distDelegatorClaims"]["nodes"]
            self.assertTrue(message[0], "\nGQLError: No results returned from query")
            self.assertEqual(message[0]["delegatorAddress"], self.validator_address, "\nGQLError: delegation address does not match")
            self.assertEqual(message[0]["validatorAddress"], self.validator_operator_address, "\nGQLError: validator address does not match")


if __name__ == '__main__':
    unittest.main()
