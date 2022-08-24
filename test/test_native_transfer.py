from gql import gql
import time, unittest, base, dateutil.parser as dp, datetime as dt, json


class TestNativeTransfer(base.Base):
    amount = 5000000
    denom = "atestfet"
    msg_type = '/cosmos.bank.v1beta1.MsgSend'
    db_query = 'SELECT amounts, denom, to_address, from_address from native_transfers'

    def test_native_transfer(self):
        self.db_cursor.execute('TRUNCATE table native_transfers')
        self.db.commit()
        self.assertFalse(self.db_cursor.execute(self.db_query).fetchall(), "\nError: table not empty after truncation")

        tx = self.ledger_client.send_tokens(self.delegator_wallet.address(), self.amount, self.denom, self.validator_wallet)
        tx.wait_to_complete()
        self.assertTrue(tx.response.is_successful(), "\nTXError: transfer tx unsuccessful")

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(5)

        native_transfer = self.db_cursor.execute(self.db_query).fetchone()
        self.assertIsNotNone(native_transfer, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(native_transfer[0][0]['amount'], str(self.amount), "\nDBError: fund amount does not match")
        self.assertEqual(native_transfer[1], self.denom, "\nDBError: fund denomination does not match")
        self.assertEqual(native_transfer[2], self.delegator_address, "\nDBError: swap sender address does not match")
        self.assertEqual(native_transfer[3], self.validator_address, "\nDBError: sender address does not match")

    def test_retrieve_transfer(self):  # As of now, this test depends on the execution of the previous test in this class.
        result = self.get_latest_block_timestamp()
        time_before = result - dt.timedelta(minutes=5)  # create a second timestamp for five minutes before
        time_before = json.dumps(time_before.isoformat())  # convert both to JSON ISO format
        time_latest = json.dumps(result.isoformat())

        # query native transactions, query related block and filter by timestamp, returning all within last five minutes
        query_get_by_range = gql(
            """
            query getByRange {
                nativeTransfers (
                filter: {
                    block: {
                    timestamp: {
                        greaterThanOrEqualTo: """ + time_before + """,
                        lessThanOrEqualTo: """ + time_latest + """
                        }
                    }
                }) {
                nodes {
                    denom
                    toAddress
                    fromAddress
                    }
                }
            }
            """
        )

        # query native transactions, filter by recipient address
        query_get_by_to_address = gql(
            """
            query getByToAddress {
                nativeTransfers (
                filter: {
                    toAddress: {
                        equalTo: """+json.dumps(self.delegator_address)+"""
                        }
                    }
                ) {
                nodes {
                    denom
                    toAddress
                    fromAddress
                    }
                }
            }
            """
        )

        # query native transactions, filter by sender address
        query_get_by_from_address = gql(
            """
            query getByFromAddress {
                nativeTransfers (
                filter: {
                    fromAddress: {
                        equalTo: """+json.dumps(self.validator_address)+"""
                        }
                    }
                ) {
                nodes {
                    denom
                    toAddress
                    fromAddress
                    }
                }
            }
            """
        )

        # query native transactions, filter by denomination
        query_get_by_denom = gql(
            """
            query getByDenom {
                nativeTransfers (
                filter: {
                    denom: {
                        equalTo:\""""+self.denom+"""\"
                    }
                }) {
                    nodes {
                        denom
                        toAddress
                        fromAddress
                    }
                }
            }
            """
        )

        queries = [query_get_by_range, query_get_by_to_address, query_get_by_from_address, query_get_by_denom]
        for query in queries:
            result = self.gql_client.execute(query)
            """
            ["nativeTransfers"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
            This provides {"toAddress":address, "fromAddress":address, "denom":denom, "amount":["amount":amount, "denom":denom]}
            which can be destructured for the values of interest.
            """
            message = result["nativeTransfers"]["nodes"]
            self.assertTrue(message, "\nGQLError: No results returned from query")
            self.assertEqual(message[0]["denom"], self.denom, "\nGQLError: fund denomination does not match")
            self.assertEqual(message[0]["toAddress"], self.delegator_address, "\nGQLError: destination address does not match")
            self.assertEqual(message[0]["fromAddress"], self.validator_address, "\nGQLError: from address does not match")


if __name__ == '__main__':
    unittest.main()
