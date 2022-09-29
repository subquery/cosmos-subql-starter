from cosmpy.aerial.wallet import LocalWallet
from cosmpy.crypto.address import Address
from cosmpy.protos.cosmos.gov.v1beta1 import query_pb2_grpc
from cosmpy.aerial.client import LedgerClient, NetworkConfig
from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport
import grpc, unittest, psycopg, dateutil.parser as dp

# TODO: support overriding somehow (e.g. CLI args)
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "subquery"
DB_USER = "subquery"
DB_PASS = "subquery"
FETCHD_HOST = "localhost"
FETCHD_GRPC_PORT = "9090"
WASMD_HOST = "localhost"
WASMD_GRPC_PORT = "19090"

GRAPHQL_API_URL = "http://localhost:3000"

CASCADE_TRUNCATE_TABLES = frozenset({"blocks", "transactions", "messages", "events"})

VALIDATOR_MNEMONIC = "nut grocery slice visit barrel peanut tumble patch slim logic install evidence fiction shield rich brown around arrest fresh position animal butter forget cost"
DELEGATOR_MNEMONIC = "dismiss domain uniform image cute buzz ride anxiety nose canvas ripple stock buffalo bitter spirit maximum tone inner couch forum equal usage state scan"

class TruncationException(Exception):
    def __init__(self, table, count):
        super().__init__(f"truncation of table \"{table}\" failed, {count} records remain")


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
        cls.validator_wallet = LocalWallet.from_mnemonic(VALIDATOR_MNEMONIC)
        cls.validator_address = str(cls.validator_wallet.address())
        cls.validator_operator_address = Address(bytes(cls.validator_wallet.address()), prefix="fetchvaloper")

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

        transport = AIOHTTPTransport(url=GRAPHQL_API_URL)
        cls.gql_client = Client(transport=transport, fetch_schema_from_transport=True)

        cls.db = psycopg.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            options=f'-c search_path=app'
        )

        cls.db_cursor = cls.db.cursor()

    @classmethod
    def tearDownClass(cls):
        if cls.db is not None:
            cls.db.close()

    def get_latest_block_timestamp(self):
        query_get_time = gql(  # get the timestamp from the latest block
            """
            query getDate {
                blocks (orderBy:TIMESTAMP_DESC, first:1) {
                    nodes {
                        timestamp
                    }
                }
            }
            """
        )
        result = self.gql_client.execute(query_get_time)["blocks"]["nodes"][0]["timestamp"]
        result = dp.parse(result)  # parse into datetime obj
        return result

    @classmethod
    def clean_db(cls, ensure_empty_tables={}):
        table_names = list(CASCADE_TRUNCATE_TABLES.union(ensure_empty_tables))
        cls.db_cursor.execute(f"TRUNCATE table {', '.join(table_names)} CASCADE")
        cls.db.commit()

        for table in table_names:
            count = cls.db_cursor.execute(f"SELECT id from {table}").rowcount
            if count != 0:
                raise TruncationException(table, count)

if __name__ == '__main__':
    unittest.main()
