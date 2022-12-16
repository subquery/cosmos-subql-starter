import unittest

import grpc
from cosmpy.aerial.client import LedgerClient, NetworkConfig
from cosmpy.aerial.wallet import LocalWallet
from cosmpy.crypto.address import Address
from cosmpy.protos.cosmos.gov.v1beta1 import query_pb2_grpc

from tests.helpers.clients import (
    FETCHD_GRPC_PORT,
    FETCHD_HOST,
    TestWithDBConn,
    TestWithGQLClient,
)

VALIDATOR_MNEMONIC = "nut grocery slice visit barrel peanut tumble patch slim logic install evidence fiction shield rich brown around arrest fresh position animal butter forget cost"
DELEGATOR_MNEMONIC = "dismiss domain uniform image cute buzz ride anxiety nose canvas ripple stock buffalo bitter spirit maximum tone inner couch forum equal usage state scan"


class EntityTest(TestWithDBConn, TestWithGQLClient):
    delegator_wallet = None
    delegator_address = None

    validator_wallet = None
    validator_address = None
    validator_operator_address = None

    ledger_client = None

    @classmethod
    def setUpClass(cls):
        TestWithDBConn.setUpClass()
        TestWithGQLClient.setUpClass()

        cls.validator_wallet = LocalWallet.from_mnemonic(VALIDATOR_MNEMONIC)
        cls.validator_address = str(cls.validator_wallet.address())
        cls.validator_operator_address = Address(
            bytes(cls.validator_wallet.address()), prefix="fetchvaloper"
        )

        cls.delegator_wallet = LocalWallet.from_mnemonic(DELEGATOR_MNEMONIC)
        cls.delegator_address = str(cls.delegator_wallet.address())

        cfg = NetworkConfig(
            chain_id="fetchchain",
            url=f"grpc+http://{FETCHD_HOST}:{FETCHD_GRPC_PORT}",
            fee_minimum_gas_price=1,
            fee_denomination="atestfet",
            staking_denomination="atestfet",
        )

        gov_client = grpc.insecure_channel(f"{FETCHD_HOST}:{FETCHD_GRPC_PORT}")

        cls.ledger_client = LedgerClient(cfg)
        cls.gov_module = query_pb2_grpc.QueryStub(gov_client)

    @classmethod
    def get_delegator_account(cls):
        return cls.ledger_client.query_account(cls.delegator_address)


if __name__ == "__main__":
    unittest.main()
