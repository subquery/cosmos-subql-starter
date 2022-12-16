from dataclasses import dataclass, field
from typing import Dict, List

from .utils import Coin, ListConstructorMixin, OwnAttrsMixin, list_field_with_default


@dataclass(frozen=True)
class BalanceData(ListConstructorMixin):
    address: str = field(default_factory=str)
    coins: List[Coin] = list_field_with_default(Coin)


class Balance(BalanceData, ListConstructorMixin, OwnAttrsMixin):
    def __init__(self, **kwargs):
        kwargs["coins"] = Coin.from_dict_list(kwargs.get("coins"))
        super().__init__(**kwargs)


@dataclass(frozen=True)
class BankStateData:
    balances: List[Balance] = list_field_with_default(Balance)
    denom_metadata: List[Dict] = list_field_with_default(dict)
    params: Dict = field(default_factory=dict)
    supply: List[Coin] = list_field_with_default(Coin)


class BankState(OwnAttrsMixin, BankStateData):
    def __init__(self, **kwargs):
        kwargs["balances"] = Balance.from_dict_list(kwargs.get("balances"))
        kwargs["supply"] = Coin.from_dict_list(kwargs.get("supply"))
        super().__init__(**kwargs)
