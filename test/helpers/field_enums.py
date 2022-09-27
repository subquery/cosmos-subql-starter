from enum import Enum


class NamedFields(Enum):
    @classmethod
    def select_column_names(cls):
        return [f'"{field.name}"' for field in cls]

    @classmethod
    def select_query(cls, table, prefix=False):
        columns = cls.select_column_names()
        """ More complex queries might require disambiguation, eg. where two 'id' attributes are being referenced
            - 'relevant_table.id' this prefix would solve it"""
        if prefix:
            columns = [f"{table}.{column}" for column in columns]
        return f"SELECT {', '.join(columns)} FROM {table}"


class BlockFields(NamedFields):
    id = 0
    chain_id = 1
    height = 2
    timestamp = 3

    @classmethod
    def select_query(cls, table="blocks", prefix=False):
        return super().select_query(table, prefix)


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
    def select_query(cls, table="transactions", prefix=False):
        return super().select_query(table, prefix)


class MsgFields(NamedFields):
    id = 0
    transaction_id = 1
    block_id = 2
    type_url = 3
    json = 4

    @classmethod
    def select_query(cls, table="messages", prefix=False):
        return super().select_query(table, prefix)


class EventFields(NamedFields):
    id = 0
    transaction_id = 1
    block_id = 2
    type = 3
    attributes = 4

    @classmethod
    def select_query(cls, table="events", prefix=False):
        return super().select_query(table, prefix)


class NativeTransferFields(NamedFields):
    id = 0
    amounts = 1
    denom = 2
    to_address = 3
    from_address = 4

    @classmethod
    def select_query(cls, table="native_transfers", prefix=False):
        return super().select_query(table, prefix)


class Cw20TransferFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    block_id = 3
    amount = 4
    to_address = 5
    from_address = 6
    contract = 7

    @classmethod
    def select_query(cls, table="cw20_transfers", prefix=False):
        return super().select_query(table, prefix)


class Cw20BalanceChangeFields(NamedFields):
    id = 0
    balance_offset = 1
    contract = 2
    account_id = 3
    event_id = 4
    transaction_id = 5
    block_id = 6

    @classmethod
    def select_query(cls, table="cw20_balance_changes", prefix=False):
        return super().select_query(table, prefix)

    @classmethod
    def by_execute_contract_method(cls, method):
        return f"{cls.select_query(prefix=True)}, execute_contract_messages " \
               f"WHERE execute_contract_messages.id = execute_contract_message_id and method = '{method}' "


class LegacyBridgeSwapFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    block_id = 3
    destination = 4
    amount = 5
    denom = 6
    contract = 7

    @classmethod
    def select_query(cls, table="legacy_bridge_swaps", prefix=False):
        return super().select_query(table, prefix)


class GovProposalVoteFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    block_id = 3
    proposal_id = 4
    voter_address = 5
    option = 6

    @classmethod
    def select_query(cls, table="gov_proposal_votes", prefix=False):
        return super().select_query(table, prefix)


class ExecuteContractMessageFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    contract = 3
    method = 4
    funds = 5

    @classmethod
    def select_query(cls, table="execute_contract_messages", prefix=False):
        return super().select_query(table, prefix)


class DistDelegatorClaimFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    block_id = 3
    delegator_address = 4
    validator_address = 5
    amount = 6
    denom = 7

    @classmethod
    def select_query(cls, table="dist_delegator_claims", prefix=False):
        return super().select_query(table, prefix)


class NativeBalanceChangeFields(NamedFields):
    id = 0
    balance_offset = 1
    denom = 2
    account_id = 3
    event_id = 4
    transaction_id = 5
    block_id = 6
    
    @classmethod
    def select_query(cls, table="native_balance_changes", prefix=False):
        return super().select_query(table, prefix)
