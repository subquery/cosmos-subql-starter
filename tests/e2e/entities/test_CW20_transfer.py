import datetime as dt
import sys
import time
import unittest
from pathlib import Path

from src.genesis.helpers.field_enums import Cw20TransferFields
from tests.helpers.contracts import Cw20Contract
from tests.helpers.entity_test import EntityTest
from tests.helpers.graphql import test_filtered_query

repo_root_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))


class TestCw20Transfer(EntityTest):
    amount = 5000
    _contract: Cw20Contract

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"cw20_transfers"})
        cls._contract = Cw20Contract(cls.ledger_client, cls.validator_wallet)
        code_id = cls._contract._store()
        cls._contract._instantiate(code_id)
        for i in range(
            3
        ):  # repeat entity creation three times to create enough data to verify sorting
            resp = cls._contract.execute(
                {
                    "transfer": {
                        "recipient": cls.delegator_address,
                        "amount": str(cls.amount),
                    }
                },
                cls.validator_wallet,
            )
            cls.ledger_client.wait_for_query_tx(resp.tx_hash)
        time.sleep(5)

    def test_execute_transfer(self):
        transfer = self.db_cursor.execute(Cw20TransferFields.select_query()).fetchone()
        self.assertIsNotNone(
            transfer, "\nDBError: table is empty - maybe indexer did not find an entry?"
        )
        self.assertEqual(
            transfer[Cw20TransferFields.to_address.value],
            self.delegator_address,
            "\nDBError: transfer recipient address does not match",
        )
        self.assertEqual(
            transfer[Cw20TransferFields.contract.value],
            self._contract.address,
            "\nDBError: contract address does not match",
        )
        self.assertEqual(
            transfer[Cw20TransferFields.amount.value],
            self.amount,
            "\nDBError: fund amount does not match",
        )
        self.assertEqual(
            transfer[Cw20TransferFields.from_address.value],
            self.validator_address,
            "\nDBError: transfer sender address does not match",
        )

    def test_retrieve_transfer(self):
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (
            latest_block_timestamp - dt.timedelta(minutes=5)
        ).isoformat()  # convert both to JSON ISO format
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
                block {
                    id
                    height
                }
            }
            """

        default_filter = {  # filter parameter of helper function must not be null, so instead use rhetorical filter
            "block": {"height": {"greaterThanOrEqualTo": "0"}}
        }

        def filtered_cw20_transfer_query(_filter, order=""):
            return test_filtered_query(
                "cw20Transfers", _filter, cw20_transfer_nodes, _order=order
            )

        order_by_block_height_asc = filtered_cw20_transfer_query(
            default_filter, "CW20_TRANSFERS_BY_BLOCK_HEIGHT_ASC"
        )

        order_by_block_height_desc = filtered_cw20_transfer_query(
            default_filter, "CW20_TRANSFERS_BY_BLOCK_HEIGHT_DESC"
        )

        # query Cw20 transfers, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_cw20_transfer_query(
            {
                "block": {
                    "timestamp": {
                        "greaterThanOrEqualTo": min_timestamp,
                        "lessThanOrEqualTo": max_timestamp,
                    }
                }
            }
        )

        # query Cw20 transfers, filter by destination address
        filter_by_to_address_equals = filtered_cw20_transfer_query(
            {"toAddress": {"equalTo": str(self.delegator_address)}}
        )

        # query Cw20 transfers, filter by destination address
        filter_by_from_address_equals = filtered_cw20_transfer_query(
            {"fromAddress": {"equalTo": str(self.validator_address)}}
        )

        # query Cw20 transfers, filter by contract address
        filter_by_contract_equals = filtered_cw20_transfer_query(
            {"contract": {"equalTo": str(self._contract.address)}}
        )

        # query Cw20 transfers, filter by amount
        filter_by_amount_above = filtered_cw20_transfer_query(
            {"amount": {"greaterThan": "1"}}
        )

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
                ["cw20Transfers"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
                This provides {"from_address":sender address, "to_address: destination address, "amount":amount, "contract":contract address}
                which can be destructured for the values of interest.
                """
                transfer = result["cw20Transfers"]["nodes"]
                self.assertNotEqual(
                    transfer, [], "\nGQLError: No results returned from query"
                )
                self.assertEqual(
                    transfer[0]["toAddress"],
                    self.delegator_address,
                    "\nGQLError: transfer recipient address does not match",
                )
                self.assertEqual(
                    transfer[0]["fromAddress"],
                    self.validator_address,
                    "\nGQLError: transfer sender address does not match",
                )
                self.assertEqual(
                    int(transfer[0]["amount"]),
                    int(self.amount),
                    "\nGQLError: fund amount does not match",
                )
                self.assertEqual(
                    transfer[0]["contract"],
                    self._contract.address,
                    "\nGQLError: contract address does not match",
                )

        for (name, query, orderAssert) in (
            (
                "order by block height ascending",
                order_by_block_height_asc,
                self.assertGreaterEqual,
            ),
            (
                "order by block height descending",
                order_by_block_height_desc,
                self.assertLessEqual,
            ),
        ):
            with self.subTest(name):
                result = self.gql_client.execute(query)
                cw20_transfers = result["cw20Transfers"]["nodes"]
                last = cw20_transfers[0]["block"]["height"]
                for entry in cw20_transfers:
                    cur = entry["block"]["height"]
                    orderAssert(
                        cur, last, msg="OrderAssertError: order of objects is incorrect"
                    )
                    last = cur


if __name__ == "__main__":
    unittest.main()
