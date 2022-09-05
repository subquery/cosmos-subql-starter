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


class NativeTransferFields(NamedFields):
    id = 0
    amounts = 1
    denom = 2
    to_address = 3
    from_address = 4

    @classmethod
    def select_query(cls, table="native_transfers"):
        return super().select_query(table)


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
    def select_query(cls, table="legacy_bridge_swaps"):
        return super().select_query(table)


class GovProposalVoteFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    block_id = 3
    proposal_id = 4
    voter_address = 5
    option = 6

    @classmethod
    def select_query(cls, table="gov_proposal_votes"):
        return super().select_query(table)


class ExecuteContractMessageFields(NamedFields):
    id = 0
    message_id = 1
    transaction_id = 2
    contract = 3
    method = 4
    funds = 5

    @classmethod
    def select_query(cls, table="execute_contract_messages"):
        return super().select_query(table)


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
    def select_query(cls, table="dist_delegator_claims"):
        return super().select_query(table)
