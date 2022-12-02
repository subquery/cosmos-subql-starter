import sys
from enum import Enum
from pathlib import Path
from typing import List

repo_root_path = Path(__file__).parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))


class NamedFields(Enum):
    @classmethod
    def select_column_names(cls) -> List[str]:
        return [f'"{field.name}"' for field in cls]

    @classmethod
    def select_query(cls, tables: List[str] = None, prefix=False) -> str:
        if tables is None:
            tables = [cls.table]

        columns = cls.select_column_names()
        """ More complex queries might require disambiguation, eg. where two 'id' attributes are being referenced
            - 'relevant_table.id' this prefix would solve it"""
        if prefix:
            columns = [f"{cls.table}.{column}" for column in columns]

        if len(tables) == 1:
            tables_str = tables[0]
        else:
            tables_str = ", ".join(tables)

        return f"SELECT {', '.join(columns)} FROM {tables_str}"

    @classmethod
    def select_where(
        cls, where_clause: str, tables: List[str] = None, prefix=False
    ) -> str:
        return f"{cls.select_query(tables=tables, prefix=True)} WHERE {where_clause}"


class BlockFields(NamedFields):
    id = 0
    chain_id = 1
    height = 2
    timestamp = 3

    @classmethod
    @property
    def table(self):
        return "blocks"


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
    @property
    def table(self):
        return "transactions"


class MsgFields(NamedFields):
    id = 0
    transaction_id = 1
    block_id = 2
    type_url = 3
    json = 4

    @classmethod
    @property
    def table(self):
        return "messages"


class EventFields(NamedFields):
    id = 0
    transaction_id = 1
    block_id = 2
    type = 3
    attributes = 4

    @classmethod
    @property
    def table(self):
        return "events"


class NativeTransferFields(NamedFields):
    id = 0
    amounts = 1
    denom = 2
    to_address = 3
    from_address = 4

    @classmethod
    @property
    def table(self):
        return "native_transfers"


class StoreMessageFields(NamedFields):
    id = 0
    sender = 1
    permission = 2
    code_id = 3
    message_id = 4
    transaction_id = 5
    block_id = 6

    @classmethod
    @property
    def table(self):
        return "store_contract_messages"


class InstantiateMessageFields(NamedFields):
    id = 0
    sender = 1
    admin = 2
    code_id = 3
    label = 4
    payload = 5
    funds = 6
    message_id = 7
    transaction_id = 8
    block_id = 9

    @classmethod
    @property
    def table(self):
        return "instantiate_contract_messages"


class ContractFields(NamedFields):
    id = 0
    interfaces = 1
    store_message_id = 2
    instantiate_message_id = 3

    @classmethod
    @property
    def table(self):
        return "contracts"


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
    @property
    def table(self):
        return "cw20_transfers"


class Cw20BalanceChangeFields(NamedFields):
    id = 0
    balance_offset = 1
    contract = 2
    account_id = 3
    event_id = 4
    transaction_id = 5
    block_id = 6

    @classmethod
    @property
    def table(self):
        return "cw20_balance_changes"

    @classmethod
    def by_execute_contract_method(cls, method):
        where = f" execute_contract_messages.id = execute_contract_message_id and method = '{method}'"
        tables = (cls.table, "execute_contract_messages")
        return cls.select_where(where_clause=where, tables=tables, prefix=True)


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
    @property
    def table(self):
        return "legacy_bridge_swaps"


class GovProposalVoteFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    block_id = 3
    proposal_id = 4
    voter_address = 5
    option = 6

    @classmethod
    @property
    def table(self):
        return "gov_proposal_votes"


class ExecuteContractMessageFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    contract = 3
    method = 4
    funds = 5

    @classmethod
    @property
    def table(self):
        return "execute_contract_messages"


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
    @property
    def table(self):
        return "dist_delegator_claims"


class NativeBalanceChangeFields(NamedFields):
    id = 0
    balance_offset = 1
    denom = 2
    account_id = 3
    event_id = 4
    transaction_id = 5
    block_id = 6

    @classmethod
    @property
    def table(self):
        return "native_balance_changes"


class Accounts(NamedFields):
    id = 0
    chain_id = 1

    @classmethod
    @property
    def table(self):
        return "accounts"


class NativeBalances(NamedFields):
    id = 0
    account_id = 1
    amount = 2
    denom = 3

    @classmethod
    @property
    def table(self):
        return "genesis_balances"


class IBCTransferFields(NamedFields):
    id = 0
    to_address = 1
    from_address = 2
    amount = 3
    denom = 4
    source_channel = 5
    source_port = 6
    event_id = 7
    message_id = 8
    transaction_id = 9
    block_id = 10

    @classmethod
    @property
    def table(self):
        return "ibc_transfers"


class AuthzExecFields(NamedFields):
    id = 0
    grantee = 1
    message_id = 2
    transaction_id = 3
    block_id = 4

    @classmethod
    @property
    def table(self):
        return "authz_execs"


class AuthzExecMessageFields(NamedFields):
    id = 0
    authz_exec_id = 1
    message_id = 2

    @classmethod
    @property
    def table(self):
        return "authz_exec_messages"
