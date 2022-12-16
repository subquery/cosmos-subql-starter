from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


def list_field_with_default(default: Any):
    field(default_factory=lambda: [default])


class OwnAttrsMixin:
    @property
    def attrs(self) -> List[str]:
        """
        Returns list of attributes which do not start with "_"
        """

        return [v for v in self.__dict__.keys() if not v.startswith("_")]


class ListConstructorMixin:
    @classmethod
    def from_dict_list(cls, list_: Optional[Dict]):
        if list_ is None:
            return []

        return [cls(**v) for v in list_]


@dataclass
class Coin(ListConstructorMixin, OwnAttrsMixin):
    amount: str
    denom: str
