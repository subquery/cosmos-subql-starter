import os
from dataclasses import dataclass
from typing import Optional, Union

from cosmpy.aerial.client import LedgerClient
from cosmpy.aerial.contract import LedgerContract
from cosmpy.aerial.wallet import Wallet
from cosmpy.crypto.address import Address
from dataclasses_json import dataclass_json

from tests.helpers.github import download_github_release_asset


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


@dataclass_json
@dataclass
class AlmanacContractConfig:
    stake_denom: str
    expiry_height: Optional[int]
    register_stake_amount: Optional[str]
    admin: Optional[str]

    @property
    def register_stake_funds(self) -> Union[None, str]:
        if self.register_stake_amount == "0" or self.register_stake_amount is None:
            return None
        return self.register_stake_amount + self.stake_denom


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

DefaultAlmanacContractConfig = AlmanacContractConfig(
    stake_denom="atestfet", expiry_height=2, register_stake_amount="0", admin=None
)


def ensure_contract(
    owner: str,
    repo: str,
    filename: str,
    token: Optional[str] = None,
    *,
    version: Optional[str] = "latest",
) -> str:
    contract_path = f".contract/{filename}"
    if not os.path.exists(".contract"):
        os.mkdir(".contract")
    try:
        temp = open(contract_path, "rb")
        temp.close()
    except OSError:
        with open(contract_path, "wb") as file:
            download_github_release_asset(
                owner, repo, filename, file, token, version=version
            )
    finally:
        return contract_path


class DeployTestContract(LedgerContract):
    def __init__(self, client: LedgerClient, admin: Wallet):
        """Using a slightly older version of CW20 contract as a test contract - as this will still be classified as the
        CW20 interface, but is different enough to allow a unique store_code message during testing."""
        contract_path = ensure_contract(
            "CosmWasm", "cw-plus", "cw20_base.wasm", version="v0.14.0"
        )
        super().__init__(contract_path, client)

        self.deploy(
            {
                "name": "test coin",
                "symbol": "TEST",
                "decimals": 6,
                "initial_balances": [
                    {
                        "amount": "3000000000000000000000000",
                        "address": str(admin.address()),
                    }
                ],
                "mint": {"minter": str(admin.address())},
            },
            admin,
            store_gas_limit=3000000,
        )


class Cw20Contract(LedgerContract):
    admin: Wallet = None
    gas_limit: int = 3000000

    def __init__(self, client: LedgerClient, admin: Wallet):
        self.admin = admin
        contract_path = ensure_contract(
            "CosmWasm", "cw-plus", "cw20_base.wasm", version="v0.16.0"
        )
        super().__init__(contract_path, client)

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
    cfg: BridgeContractConfig
    gas_limit: int = 3000000

    def __init__(self, client: LedgerClient, admin: Wallet, cfg: BridgeContractConfig):
        self.cfg = cfg
        self.admin = admin
        contract_path = ensure_contract(
            "fetchai", "fetch-ethereum-bridge-v1", "bridge.wasm"
        )
        # LedgerContract will attempt to discover any existing contract having the same bytecode hash
        # see https://github.com/fetchai/cosmpy/blob/master/cosmpy/aerial/contract/__init__.py#L74
        super().__init__(contract_path, client)

    def _store(self) -> int:
        assert self.admin is not None
        return self.store(self.admin, self.gas_limit)

    def _instantiate(self) -> Address:
        assert (self.admin and self.cfg) is not None
        return self.instantiate(self.cfg.to_dict(), self.admin)  # type: ignore


class AlmanacContract(LedgerContract):
    def __init__(
        self,
        client: LedgerClient,
        admin: Wallet,
        cfg: AlmanacContractConfig = DefaultAlmanacContractConfig,
    ):
        self.cfg = cfg
        self.admin = admin
        token = os.environ.get("GITHUB_AUTHORIZATION_TOKEN")
        contract_path = ensure_contract(
            "fetchai",
            "contract-agent-almanac",
            "contract_agent_almanac.wasm",
            token=token,
        )
        super().__init__(contract_path, client)

        self.deploy(self.cfg.to_dict(), admin, store_gas_limit=3000000)  # type: ignore
