from dataclasses import dataclass
from typing import Tuple, Generator, Any, Optional, List

from psycopg import Connection
from reactivex import Observer, Observable
from reactivex.abc import DisposableBase
from reactivex.operators import filter as filter_, map as map_, observe_on, buffer_with_count
from reactivex.scheduler.scheduler import Scheduler

from src.genesis.db import DBTypes, TableManager
from src.genesis.state import Balance
from .chain_id import ChainIdObserver

accounts_keys_path = ".app_state.bank.balances"


@dataclass
class Account:
    id: str
    chain_id: str


class AccountsObserver(Observer):
    _chain_id: str
    _chain_id_observer: ChainIdObserver
    _chain_id_subscription: DisposableBase

    @staticmethod
    def filter_accounts(next_: Tuple[str, any]):
        return next_[0].startswith(accounts_keys_path)

    def __init__(self, on_next=None, on_completed=None, on_error=None) -> None:
        super().__init__(on_next=on_next, on_completed=on_completed, on_error=on_error)
        self._chain_id_observer = ChainIdObserver(on_next=self._set_chain_id)

    def subscribe_to(self, observable: Observable, pre_operators=None, post_operators=None) -> DisposableBase:
        self._chain_id_subscription = self._chain_id_observer.subscribe_to(observable)

        _operators = [
            filter_(self.filter_accounts),
        ]
        if post_operators is not None:
            _operators += post_operators
        if pre_operators is not None:
            _operators = pre_operators + _operators

        return observable.pipe(*_operators).subscribe(on_next=self.on_next,
                                                      on_completed=self.on_completed,
                                                      on_error=self.on_error)

    def map_account(self, next_: Tuple[str, Balance]):
        return Account(id=next_[1].address, chain_id=self._chain_id)

    def _set_chain_id(self, chain_id: str) -> None:
        self._chain_id = chain_id


class AccountsManager(TableManager):
    _observer: AccountsObserver
    _subscription: DisposableBase
    _db_conn: Connection
    _table = "accounts"
    _columns = (
        ("id", DBTypes.text),
        ("chain_id", DBTypes.text),
    )
    _indexes = (
        "id",
        "chain_id",
    )

    @property
    def column_names(self) -> Generator[str, Any, None]:
        return (name for name, _ in self._columns)

    def __init__(self, db_conn: Connection, on_completed=None, on_error=None) -> None:
        super().__init__(db_conn)
        self._ensure_table()
        self._observer = AccountsObserver(on_next=self.copy_accounts,
                                          on_completed=on_completed,
                                          on_error=on_error)

    def copy_accounts(self, accounts: List[Account]) -> None:
        with self._db_conn.cursor() as db:
            # TODO: check if account exists (?)
            with db.copy(f'COPY {self._table} ({",".join(self.column_names)}) FROM STDIN') as copy:
                for account in accounts:
                    values = (f"{getattr(account, c)}" for c in self.column_names)
                    copy.write_row(values)
        self._db_conn.commit()

    def observe(self, observable: Observable, scheduler: Optional[Scheduler] = None, buffer_size: int = 500) -> None:
        # TODO: figure out how to use replay
        pre_operators = []
        post_operators = [
            map_(self._observer.map_account),
            buffer_with_count(buffer_size),
        ]
        if scheduler is not None:
            pre_operators.append(observe_on(scheduler=scheduler))

        self._subscription = self._observer.subscribe_to(observable,
                                                         pre_operators=pre_operators,
                                                         post_operators=post_operators)
