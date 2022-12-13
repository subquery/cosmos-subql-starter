import os
from dataclasses import dataclass

import requests
from cosmpy.aerial.client import LedgerClient
from cosmpy.aerial.contract import LedgerContract
from cosmpy.aerial.wallet import Wallet
from cosmpy.crypto.address import Address
from dataclasses_json import dataclass_json


@dataclass_json
@dataclass
class BridgeContractConfig:
    cap: str
    reverse_aggregated_allowance: str
    reverse_aggregated_allowance_approver_cap: str
    lower_swap_limit: str
    upper_swap_limit: str
    swap_fee: str
    paused_since_block: int
    denom: str
    next_swap_id: int


DefaultBridgeContractConfig = BridgeContractConfig(
    cap="250000000000000000000000000",
    reverse_aggregated_allowance="3000000000000000000000000",
    reverse_aggregated_allowance_approver_cap="3000000000000000000000000",
    lower_swap_limit="1",
    upper_swap_limit="1000000000000000000000000",
    swap_fee="0",
    paused_since_block=18446744073709551615,
    denom="atestfet",
    next_swap_id=0,
)


class Cw20Contract(LedgerContract):
    admin: Wallet = None
    gas_limit: int = 3000000

    def __init__(self, client: LedgerClient, admin: Wallet):
        self.admin = admin
        url = "https://github.com/CosmWasm/cw-plus/releases/download/v0.16.0/cw20_base.wasm"
        if not os.path.exists(".contract"):
            os.mkdir(".contract")
        try:
            temp = open(".contract/cw20.wasm", "rb")
            temp.close()
        except:  # noqa: E722
            contract_request = requests.get(url)
            with open(".contract/cw20.wasm", "wb") as file:
                file.write(contract_request.content)

        super().__init__(".contract/cw20.wasm", client)

    def _store(self) -> int:
        assert self.admin is not None
        return self.store(self.admin, self.gas_limit)

    def _instantiate(self) -> Address:
        assert self.admin is not None
        return self.instantiate(
            {
                "name": "test coin",
                "symbol": "TEST",
                "decimals": 6,
                "initial_balances": [
                    {
                        "amount": "3000000000000000000000000",
                        "address": str(self.admin.address()),
                    }
                ],
                "mint": {"minter": str(self.admin.address())},
            },
            self.admin,
        )


class BridgeContract(LedgerContract):
    admin: Wallet = None
    cfg: BridgeContractConfig = None
    gas_limit: int = 3000000

    def __init__(self, client: LedgerClient, admin: Wallet, cfg: BridgeContractConfig):
        self.cfg = cfg
        self.admin = admin
        url = "https://github.com/fetchai/fetch-ethereum-bridge-v1/releases/download/v0.2.0/bridge.wasm"
        if not os.path.exists(".contract"):
            os.mkdir(".contract")
        try:
            temp = open(".contract/bridge.wasm", "rb")
            temp.close()
        except:  # noqa: E722
            contract_request = requests.get(url)
            with open(".contract/bridge.wasm", "wb") as file:
                file.write(contract_request.content)
        # LedgerContract will attempt to discover any existing contract having the same bytecode hash
        # see https://github.com/fetchai/cosmpy/blob/master/cosmpy/aerial/contract/__init__.py#L74
        super().__init__(".contract/bridge.wasm", client)

    def _store(self) -> int:
        assert self.admin is not None
        return self.store(self.admin, self.gas_limit)

    def _instantiate(self) -> Address:
        assert (self.admin and self.cfg) is not None
        return self.instantiate(
            self.cfg.to_dict(),
            self.admin
        )
