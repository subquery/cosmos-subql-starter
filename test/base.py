from cosmpy.aerial.wallet import LocalWallet
from cosmpy.crypto.keypairs import PrivateKey
from cosmpy.crypto.address import Address
from cosmpy.protos.cosmos.gov.v1beta1 import query_pb2_grpc
from bip_utils import Bip39SeedGenerator, Bip44, Bip44Coins
from cosmpy.aerial.client import LedgerClient, NetworkConfig, utils
from gql import Client
from gql.transport.aiohttp import AIOHTTPTransport
import grpc, unittest, psycopg


class Base(unittest.TestCase):
    delegator_wallet = None
    delegator_address = None

    validator_wallet = None
    validator_address = None
    validator_operator_address = None

    ledger_client = None
    db = None
    db_cursor = None
    gql_client = None

    @classmethod
    def setUpClass(cls):
        validator_mnemonic = "nut grocery slice visit barrel peanut tumble patch slim logic install evidence fiction shield rich brown around arrest fresh position animal butter forget cost"
        cls.validator_wallet = get_wallet(validator_mnemonic)
        cls.validator_address = str(cls.validator_wallet.address())
        cls.validator_operator_address = Address(bytes(cls.validator_wallet.address()), prefix="fetchvaloper")

        delegator_mnemonic = "dismiss domain uniform image cute buzz ride anxiety nose canvas ripple stock buffalo bitter spirit maximum tone inner couch forum equal usage state scan"
        cls.delegator_wallet = get_wallet(delegator_mnemonic)
        cls.delegator_address = str(cls.delegator_wallet.address())

        cfg = NetworkConfig(
            chain_id="testing",
            url="grpc+http://localhost:9090",
            fee_minimum_gas_price=1,
            fee_denomination="atestfet",
            staking_denomination="atestfet",
        )

        gov_client = grpc.insecure_channel('localhost:9090')

        cls.ledger_client = LedgerClient(cfg)
        cls.gov_module = query_pb2_grpc.QueryStub(gov_client)

        transport = AIOHTTPTransport(url="http://localhost:3000")
        cls.gql_client = Client(transport=transport, fetch_schema_from_transport=True)

        cls.db = psycopg.connect(
            host="localhost",
            port="5432",
            dbname="postgres",
            user="postgres",
            password="postgres",
            options=f'-c search_path=app'
        )

        cls.db_cursor = cls.db.cursor()

    @classmethod
    def tearDownClass(cls):
        cls.db.close()


def get_wallet(mnemonic):
    seed_bytes = Bip39SeedGenerator(mnemonic).Generate()
    bip44_def_ctx = Bip44.FromSeed(seed_bytes, Bip44Coins.COSMOS).DeriveDefaultPath()
    return LocalWallet(PrivateKey(bip44_def_ctx.PrivateKey().Raw().ToBytes()))


if __name__ == '__main__':
    unittest.main()
