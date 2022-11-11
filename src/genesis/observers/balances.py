from datetime import timedelta
from typing import Tuple, Optional, List, Union

from psycopg import Connection
from psycopg.errors import UniqueViolation
from reactivex import Observer, Observable
from reactivex.abc import DisposableBase
from reactivex.operators import filter as filter_, map as map_, delay as delay_, observe_on, buffer_with_count
from reactivex.scheduler.scheduler import Scheduler

from src.genesis.db import DBTypes, TableManager
from src.genesis.helpers.field_enums import NativeBalances
from src.genesis.state import Balance
from src.utils.loggers import get_logger

native_balances_keys_path = ".app_state.bank.balances"

_logger = get_logger(__name__)


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

    @classmethod
    def _get_db_id(cls, address: str, denom: str):
        return f"{address}-{denom}"

    @classmethod
    def _get_name_and_index(cls, e: UniqueViolation, balances: List[Balance]) -> Tuple[str, Tuple[int, int]]:
        # Extract account name and coin from error string
        duplicate_balance_id = cls._extract_id_from_unique_violation_exception(e)

        # Find duplicate balance index
        duplicate_balance_index = None
        duplicate_coin_index = None
        for i in range(len(balances)):
            for j in range(len(balances[i].coins)):
                if cls._get_db_id(balances[i].address,
                                  balances[i].coins[j].denom) in duplicate_balance_id:
                    duplicate_balance_index = i
                    duplicate_coin_index = j

        return duplicate_balance_id, duplicate_balance_index, duplicate_coin_index

    def copy_balances(self, balances: List[Balance]) -> None:
        with self._db_conn.cursor() as db:
            duplicate_occured = True

            while duplicate_occured:
                try:
                    duplicate_occured = False
                    with db.copy(f'COPY {self._table} ({",".join(self.column_names)}) FROM STDIN') as copy:
                        for balance in balances:
                            for coin in balance.coins:
                                id_ = self._get_db_id(balance.address, coin.denom)
                                copy.write_row((f"{v}" for v in (id_, balance.address, coin.amount, coin.denom)))

                except UniqueViolation as e:
                    duplicate_occured = True
                    self._db_conn.commit()

                    duplicate_balance_id, duplicate_balance_index, duplicate_coin_index = \
                        self._get_name_and_index(e, balances)

                    if duplicate_balance_index is None or duplicate_coin_index is None:
                        raise RuntimeError(
                            f"Error during duplicate balance handling, account {duplicate_balance_id} not found")

                    # Compare balance in genesis with balance in db
                    amount_on_list = balances[duplicate_balance_index].coins[duplicate_coin_index].amount
                    amount_in_db = db.execute(NativeBalances.select_where(f"id = '{duplicate_balance_id}'")).fetchone()[
                        2]

                    if amount_on_list != amount_in_db:
                        raise RuntimeError(
                            f"Balance for {duplicate_balance_id} in DB ({amount_in_db}) is different from genesis ({amount_on_list})")

                    # Remove duplicate balance from queue
                    balances[duplicate_balance_index].coins.pop(duplicate_coin_index)
                    if not balances[duplicate_balance_index].coins:
                        balances.pop(duplicate_balance_index)

                    _logger.warning(f"Duplicate balance occurred during COPY: {duplicate_balance_id}")

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
