from typing import Any, Generator, Tuple

from psycopg import Connection
from psycopg.errors import UniqueViolation

from src.genesis.db.types import DBTypes


def table_exists(db_conn: Connection, table: str) -> bool:
    with db_conn.cursor() as db:
        res_db_execute = db.execute(
            f"""
                SELECT EXISTS (
                    SELECT FROM pg_tables WHERE
                        schemaname = 'app' AND
                        tablename  = '{table}'
                )
            """
        ).fetchone()

        assert res_db_execute is not None

        return res_db_execute[0]


class TableManager:
    _db_conn: Connection
    _table: str
    _columns: Tuple[Tuple[str, DBTypes], ...]  # [(<name>, <type>)]
    _indexes: Tuple[str, ...]

    def __init__(self, db_conn: Connection):
        self._db_conn = db_conn

    @classmethod
    def get_column_names(cls) -> Generator[str, Any, None]:
        return (name for name, _ in cls._columns)

    @classmethod
    def select_query(cls) -> str:
        return f"""
            SELECT {",".join(cls.get_column_names())} FROM {cls._table}
        """

    def _ensure_table(self):
        with self._db_conn.cursor() as db:
            db.execute(
                f"""
                CREATE TABLE IF NOT EXISTS {self._table} (
                    {", ".join([f"{name} {type_.value}" for name, type_ in self._columns])}
                );
                -- TODO: psycopg break out of transaction
                -- CREATE INDEX CONCURRENTLY ON {self._table} ({",".join(self._indexes)})
            """
            )
            self._db_conn.commit()
            # TODO error checking / handling (?)

    def _drop_table(self, cascade: bool = False):
        cascade_clause = ""
        if cascade:
            cascade_clause = "CASCADE"

        with self._db_conn.cursor() as db:
            db.execute(
                f"""
                DROP TABLE IF EXISTS {self._table} {cascade_clause};
            """
            )
            self._db_conn.commit()
            # TODO error checking / handling (?)

    @classmethod
    def _extract_id_from_unique_violation_exception(cls, e: UniqueViolation) -> str:
        # Extract which ID was violated from UniqueViolation exception
        return str(e).split("(")[2].split(")")[0]
