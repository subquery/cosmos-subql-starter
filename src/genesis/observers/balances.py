from datetime import timedelta
from typing import Tuple, Optional, List, Union

from psycopg import Connection
from reactivex import Observer, Observable
from reactivex.abc import DisposableBase
from reactivex.operators import filter as filter_, map as map_, delay as delay_, observe_on, buffer_with_count
from reactivex.scheduler.scheduler import Scheduler

from src.genesis.db import DBTypes, TableManager
from src.genesis.helpers.field_enums import NativeBalances
from src.genesis.state import Balance

native_balances_keys_path = ".app_state.bank.balances"


class NativeBalancesObserver(Observer):
    @staticmethod
    def filter_balances(next_: Tuple[str, any]) -> bool:
        return next_[0].startswith(native_balances_keys_path)

    @staticmethod
    def map_balance(next_: Tuple[str, Balance]) -> Balance:
        return next_[1]

    def __init__(self, on_next=None, on_completed=None, on_error=None) -> None:
        super().__init__(on_next=on_next, on_completed=on_completed, on_error=on_error)

    def subscribe_to(self, observable: Observable, pre_operators=None, post_operators=None) -> DisposableBase:
        _operators = [
            filter_(self.filter_balances),
        ]
        if post_operators is not None:
            _operators += post_operators
        if pre_operators is not None:
            _operators = pre_operators + _operators

        return observable.pipe(*_operators).subscribe(on_next=self.on_next,
                                                      on_completed=self.on_completed,
                                                      on_error=self.on_error)


class NativeBalancesManager(TableManager):
    _observer: NativeBalancesObserver
    _subscription: DisposableBase
    _db_conn: Connection
    _table = NativeBalances.table
    _columns = (
        ("id", DBTypes.text),
        ("account_id", DBTypes.text),
        ("amount", DBTypes.numeric),
        ("denom", DBTypes.text),
    )
    _indexes = (
        "id",
        "account_id",
        "denom",
    )

    def __init__(self, db_conn: Connection, on_completed=None, on_error=None) -> None:
        super().__init__(db_conn)
        self._ensure_table()
        self._observer = NativeBalancesObserver(on_next=self.copy_balances,
                                                on_completed=on_completed,
                                                on_error=on_error)

    def copy_balances(self, balances: List[Balance]) -> None:
        with self._db_conn.cursor() as db:
            with db.copy(f'COPY {self._table} ({",".join(self.column_names)}) FROM STDIN') as copy:
                for balance in balances:
                    for coin in balance.coins:
                        id_ = f"{balance.address}-{coin.denom}"
                        copy.write_row((f"{v}" for v in (id_, balance.address, coin.amount, coin.denom)))
        self._db_conn.commit()

    def observe(self, observable: Observable, scheduler: Optional[Scheduler] = None,
                buffer_size: int = 500, delay: Optional[Union[timedelta, float]] = None) -> None:
        pre_operators = []
        post_operators = [
            map_(self._observer.map_balance),
            buffer_with_count(buffer_size),
        ]
        # TODO: unworkaround delay operator usage; avoiding account lookup / wait
        if delay is not None:
            post_operators.insert(0, delay_(delay))
        if scheduler is not None:
            pre_operators.append(observe_on(scheduler=scheduler))

        self._subscription = self._observer.subscribe_to(observable,
                                                         pre_operators=pre_operators,
                                                         post_operators=post_operators)
