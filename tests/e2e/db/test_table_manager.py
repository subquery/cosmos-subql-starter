import sys
import unittest
from pathlib import Path

src_path = Path(__file__).parent.parent.parent.parent.absolute()
sys.path.append(str(src_path))

from tests.helpers.clients import TestWithDBConn

from src.genesis.db.table_manager import TableManager, table_exists
from src.genesis.db.types import DBTypes


class TestTableManager(TestWithDBConn):
    test_table = "table_manager_testing"
    table_manager: TableManager

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.table_manager = TableManager(cls.db_conn)
        cls.table_manager._table = cls.test_table
        cls.table_manager._columns = (
            ("text_column", DBTypes.text),
            ("numeric_column", DBTypes.numeric)
        )
        cls.table_manager._indexes = ("numeric_column",)

    @classmethod
    def setUp(cls) -> None:
        with cls.db_conn.cursor() as db:
            db.execute(f"""
                DROP TABLE IF EXISTS {cls.test_table};
            """)

    def test__ensure_table(self) -> None:
        exists = table_exists(self.db_conn, self.test_table)
        self.assertFalse(exists)

        self.table_manager._ensure_table()
        exists = table_exists(self.db_conn, self.test_table)
        self.assertTrue(exists)

    # TODO: test cascade
    # NB: _drop_table test depends on _ensure_table's correctness
    def test__drop_table(self) -> None:
        self.table_manager._ensure_table()
        exists = table_exists(self.db_conn, self.test_table)
        self.assertTrue(exists)

        self.table_manager._drop_table()
        exists = table_exists(self.db_conn, self.test_table)
        self.assertFalse(exists)


if __name__ == "__main__":
    unittest.main()
