from typing import Tuple, Optional

from reactivex import Observer, Observable
from reactivex.abc import DisposableBase
from reactivex.operators import filter as filter_, map as map_, replay, observe_on, subscribe_on
from reactivex.scheduler.scheduler import Scheduler

chain_id_keys_path = ".chain_id"


class ChainIdObserver(Observer):
    @staticmethod
    def filter_chain_id(next_: Tuple[str, any]) -> bool:
        return next_[0].startswith(chain_id_keys_path)

    def __init__(self, on_next=None, on_completed=None, on_error=None) -> None:
        super().__init__(on_next=on_next, on_completed=on_completed, on_error=on_error)

    def subscribe_to(self, observable: Observable, scheduler: Optional[Scheduler] = None) -> DisposableBase:
        operators = [
            filter_(self.filter_chain_id),
            map_(lambda next_: next_[1]),
        ]
        if scheduler is not None:
            operators.insert(0, observe_on(scheduler=scheduler))

        return observable.pipe(*operators).subscribe(on_next=self.on_next,
                                                     on_completed=self.on_completed,
                                                     on_error=self.on_error)
