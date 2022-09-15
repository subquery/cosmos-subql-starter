import unittest, base, time, datetime as dt
from contracts import CW20Contract
from helpers.field_enums import CW20TransferFields
from helpers.graphql import test_filtered_query


class TestCW20Transfer(base.Base):
    amount = 5000
    _contract: CW20Contract

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"c_w20_transfers"})

        cls._contract = CW20Contract(cls.ledger_client, cls.validator_wallet)
        resp = cls._contract.execute(
            {"transfer": {"recipient": cls.delegator_address, "amount": str(cls.amount)}},
            cls.validator_wallet)
        cls.ledger_client.wait_for_query_tx(resp.tx_hash)
        time.sleep(5)

    def test_execute_transfer(self):
        transfer = self.db_cursor.execute(CW20TransferFields.select_query()).fetchone()
        self.assertIsNotNone(transfer, "\nDBError: table is empty - maybe indexer did not find an entry?")
        self.assertEqual(transfer[CW20TransferFields.to_address.value], self.delegator_address, "\nDBError: transfer recipient address does not match")
        self.assertEqual(transfer[CW20TransferFields.contract.value], self._contract.address, "\nDBError: contract address does not match")
        self.assertEqual(transfer[CW20TransferFields.amount.value], self.amount, "\nDBError: fund amount does not match")
        self.assertEqual(transfer[CW20TransferFields.from_address.value], self.validator_address, "\nDBError: transfer sender address does not match")

    def test_retrieve_transfer(self):
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (latest_block_timestamp - dt.timedelta(minutes=5)).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        cw20_transfer_nodes = """
            {
                id
                toAddress
                fromAddress
                contract
                amount
                message { id }
                transaction { id }
                block { id }
            }
            """

        def filtered_cw20_transfer_query(_filter):
            return test_filtered_query("cW20Transfers", _filter, cw20_transfer_nodes)

        # query CW20 transfers, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_cw20_transfer_query({
            "block": {
                "timestamp": {
                    "greaterThanOrEqualTo": min_timestamp,
                    "lessThanOrEqualTo": max_timestamp
                }
            }
        })

        # query CW20 transfers, filter by destination address
        filter_by_to_address_equals = filtered_cw20_transfer_query({
            "toAddress": {
                "equalTo": str(self.delegator_address)
            }
        })

        # query CW20 transfers, filter by destination address
        filter_by_from_address_equals = filtered_cw20_transfer_query({
            "fromAddress": {
                "equalTo": str(self.validator_address)
            }
        })

        # query CW20 transfers, filter by contract address
        filter_by_contract_equals = filtered_cw20_transfer_query({
            "contract": {
                "equalTo": str(self._contract.address)
            }
        })

        # query CW20 transfers, filter by amount
        filter_by_amount_above = filtered_cw20_transfer_query({
            "amount": {
                "greaterThan": "1"
            }
        })

        for (name, query) in [
            ("by block timestamp range", filter_by_block_timestamp_range),
            ("by amount above", filter_by_amount_above),
            ("by to_address equals", filter_by_to_address_equals),
            ("by from_address equals", filter_by_from_address_equals),
            ("by contract equals", filter_by_contract_equals),
        ]:
            with self.subTest(name):
                result = self.gql_client.execute(query)
                """
                ["cW20Transfers"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
                This provides {"from_address":sender address, "to_address: destination address, "amount":amount, "contract":contract address}
                which can be destructured for the values of interest.
                """
                transfer = result["cW20Transfers"]["nodes"]
                self.assertNotEqual(transfer, [], "\nGQLError: No results returned from query")
                self.assertEqual(transfer[0]["toAddress"], self.delegator_address, "\nGQLError: transfer recipient address does not match")
                self.assertEqual(transfer[0]["fromAddress"], self.validator_address, "\nGQLError: transfer sender address does not match")
                self.assertEqual(int(transfer[0]["amount"]), int(self.amount), "\nGQLError: fund amount does not match")
                self.assertEqual(transfer[0]["contract"], self._contract.address, "\nGQLError: contract address does not match")


if __name__ == '__main__':
    unittest.main()