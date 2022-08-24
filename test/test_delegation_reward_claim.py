import base
from gql import gql
import time, unittest, datetime as dt, json


class TestDelegation(base.Base):
    amount = 100
    db_query = 'SELECT delegator_address, validator_address from dist_delegator_claims'

    def setUp(self):
        delegate_tx = self.ledger_client.delegate_tokens(self.validator_operator_address, self.amount, self.validator_wallet)
        delegate_tx.wait_to_complete()
        self.assertTrue(delegate_tx.response.is_successful(), "\nTXError: delegation tx unsuccessful")

    def test_claim_rewards(self):
        self.db_cursor.execute('TRUNCATE table dist_delegator_claims')
        self.db.commit()
        self.assertFalse(self.db_cursor.execute(self.db_query).fetchall(), "\nDBError: table not empty after truncation")

        claim_tx = self.ledger_client.claim_rewards(self.validator_operator_address, self.validator_wallet)
        claim_tx.wait_to_complete()
        self.assertTrue(claim_tx.response.is_successful(), "\nTXError: reward claim tx unsuccessful")

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(5)

        row = self.db_cursor.execute(self.db_query).fetchone()
        self.assertIsNotNone(row, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(row[0], self.validator_address, "\nDBError: delegation address does not match")
        self.assertEqual(row[1], self.validator_operator_address, "\nDBError: delegation address does not match")

    def test_retrieve_claim(self):  # As of now, this test depends on the execution of the previous test in this class.
        result = self.get_latest_block_timestamp()
        time_before = result - dt.timedelta(minutes=5)  # create a second timestamp for five minutes before
        time_before = json.dumps(time_before.isoformat())  # convert both to JSON ISO format
        time_latest = json.dumps(result.isoformat())

        # query governance votes, query related block and filter by timestamp, returning all within last five minutes
        query_by_timestamp = gql(
            """
            query get_votes_by_timestamp {
                distDelegatorClaims (
                filter: {
                    block: {
                    timestamp: {
                        greaterThanOrEqualTo: """ + time_before + """,
                                lessThanOrEqualTo: """ + time_latest + """
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
                        equalTo:\""""+str(self.validator_operator_address)+"""\"
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
                        equalTo:\""""+str(self.validator_address)+"""\"
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
