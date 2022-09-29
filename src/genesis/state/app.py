from dataclasses import dataclass, field
from typing import Dict

from src.genesis.state.bank import BankState, OwnAttrsMixin


@dataclass
class AppStateData:
    airdrop: Dict = field(default_factory=dict)
    auth: Dict = field(default_factory=dict)
    authz: Dict = field(default_factory=dict)
    bank: BankState = field(default_factory=BankState)
    capability: Dict = field(default_factory=dict)
    crisis: Dict = field(default_factory=dict)
    distribution: Dict = field(default_factory=dict)
    evidence: Dict = field(default_factory=dict)
    feegrant: Dict = field(default_factory=dict)
    genutil: Dict = field(default_factory=dict)
    gov: Dict = field(default_factory=dict)
    ibc: Dict = field(default_factory=dict)
    mint: Dict = field(default_factory=dict)
    params: Dict = field(default_factory=dict)
    slashing: Dict = field(default_factory=dict)
    staking: Dict = field(default_factory=dict)
    transfer: Dict = field(default_factory=dict)
    upgrade: Dict = field(default_factory=dict)
    vesting: Dict = field(default_factory=dict)
    wasm: Dict = field(default_factory=dict)


class AppState(OwnAttrsMixin, AppStateData):
    def __init__(self, **kwargs):
        bank_state_data = {}
        if kwargs.get("bank") is not None:
            bank_state_data = kwargs["bank"]

        concrete_state = {
            "bank": BankState(**bank_state_data),
        }
        super().__init__(**{**kwargs, **concrete_state})
