from argparse import ArgumentParser

dorado_genesis_url = "https://storage.googleapis.com/fetch-ai-testnet-genesis/genesis-dorado-827201.json"
default_db_host = "localhost"
default_db_port = 5432
default_db_user = "subquery"
default_db_pass = "subquery"
default_db_schema = "app"
default_db_name = "subquery"


def add_arguments(parser: ArgumentParser):

    parser.add_argument("json_url",
                        metavar="JSON_URL",
                        type=str, nargs="?",
                        default=dorado_genesis_url,
                        help="URL to genesis JSON data to process")

    parser.add_argument("--db-host", type=str,
                        default=default_db_host,
                        dest="db_host", nargs="?",
                        help="Database hostname, either flag OR DB_HOST environment variable must be set")

    parser.add_argument("--db-port", type=str,
                        default=default_db_port,
                        dest="db_port", nargs="?",
                        help="Database port number (default: 5432)")

    parser.add_argument("--db-user",
                        type=str,
                        default=default_db_user,
                        dest="db_user",
                        nargs="?",
                        help="Database username (default: subquery)")

    parser.add_argument("--db-pass",
                        type=str,
                        default=default_db_pass,
                        dest="db_pass",
                        nargs="?",
                        help="Database password (default: subquery)")

    parser.add_argument("--db-schema",
                        type=str,
                        default=default_db_schema,
                        dest="db_schema",
                        nargs="?",
                        help="Database schema to use (default: 'app')")

    parser.add_argument("--db-name",
                        type=str,
                        default=default_db_name,
                        dest="db_name",
                        nargs="?",
                        help="Database name to use (default: subquery)")
