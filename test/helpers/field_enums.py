from enum import Enum


class NamedFields(Enum):
    @classmethod
    def select_column_names(cls):
        return [f'"{field.name}"' for field in cls]

    @classmethod
    def select_query(cls, table):
        return f"SELECT {', '.join(cls.select_column_names())} FROM {table}"


class BlockFields(NamedFields):
    id = 0
    chain_id = 1
    height = 2
    timestamp = 3

    @classmethod
    def select_query(cls, table="blocks"):
        return super().select_query(table)


class TxFields(NamedFields):
    id = 0
    block_id = 1
    gas_used = 2
    gas_wanted = 3
    fees = 4
    memo = 5
    status = 6
    log = 7
    timeout_height = 8
    signer_address = 9

    @classmethod
    def select_query(cls, table="transactions"):
        return super().select_query(table)


class MsgFields(NamedFields):
    id = 0
    transaction_id = 1
    block_id = 2
    type_url = 3
    json = 4

    @classmethod
    def select_query(cls, table="messages"):
        return super().select_query(table)


class EventFields(NamedFields):
    id = 0
    transaction_id = 1
    block_id = 2
    type = 3
    attributes = 4

    @classmethod
    def select_query(cls, table="events"):
        return super().select_query(table)

