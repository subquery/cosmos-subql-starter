from dataclasses import dataclass, field
from typing import List, Dict, Optional

from reactivex import Observer, create
from reactivex.scheduler.scheduler import Scheduler

from src.genesis.cli.download import download_json
from src.genesis.state import AppState, OwnAttrsMixin, list_field_with_default


@dataclass
class PubKey:
    type: str = field(default_factory=str)
    value: str = field(default_factory=str)


@dataclass
class ValidatorData:
    address: str = field(default_factory=str)
    name: str = field(default_factory=str)
    power: str = field(default_factory=str)
    pub_key: PubKey = field(default_factory=PubKey)


class Validator(ValidatorData):
    def __init__(self, **kwargs):
        kwargs["pub_key"] = PubKey(**kwargs.get("pub_key"))
        super().__init__(**kwargs)


@dataclass(frozen=True)
class GenesisData(OwnAttrsMixin):
    app_hash: str = field(default_factory=str)
    app_state: AppState = field(default_factory=AppState)
    chain_id: str = field(default_factory=str)
    consensus_params: Dict = field(default_factory=dict)
    genesis_time: str = field(default_factory=str)  # e.g. "2022-02-08T18:00:00Z"
    initial_height: str = field(default_factory=str)  # int; e.g. "5300201"
    validators: List[Validator] = list_field_with_default(Validator)


class Genesis(OwnAttrsMixin):
    @staticmethod
    def download(json_url: str):
        return Genesis(**(download_json(json_url)))

    def __init__(self, **kwargs):
        kwargs["app_state"] = AppState(**kwargs.get("app_state"))

        self.data = GenesisData(**kwargs)
        self._source = create(self._observer_factory)

    def _observer_factory(self, observer: Observer, scheduler: Optional[Scheduler]):
        recurse_object(self, observer)
        observer.on_completed()

    @property
    def source(self):
        return self._source


def recurse_object(obj: OwnAttrsMixin, observer: Observer, keys_path=""):
    for attr in obj.attrs:
        # TODO: unworkaround
        if keys_path == "" and attr == "data":
            next_keys_path = keys_path
        else:
            next_keys_path = f"{keys_path}.{attr}"

        value = getattr(obj, attr)

        if isinstance(value, type(None)):
            continue

        if isinstance(value, list):
            for v in value:
                observer.on_next((next_keys_path, v))
            continue

        observer.on_next((next_keys_path, value))

        if isinstance(value, OwnAttrsMixin):
            recurse_object(value, observer, next_keys_path)


class GenesisSingleton:
    def __new__(cls, json_url=None):
        if not hasattr(cls, "_genesis"):
            if json_url is None:
                raise Exception("attempted to memoize GenesisSingleton._genesis but json_url was None")

            data = download_json(json_url)
            cls._genesis = Genesis(**data)

        return cls._genesis
