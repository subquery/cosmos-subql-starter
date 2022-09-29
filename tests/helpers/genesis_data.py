from typing import Dict, List

test_bank_state_balances = [
    {
        "address": "addr123",
        "coins": [
            {"amount": 123, "denom": "a-token"},
            {"amount": 456, "denom": "b-token"},
        ]
    },
    {
        "address": "addr456",
        "coins": [
            {"amount": 111, "denom": "a-token"},
            {"amount": 222, "denom": "b-token"},
        ]
    },
]

test_bank_state_supply: List[Dict] = [
    {"amount": "987", "denom": "a-token"},
    {"amount": "654", "denom": "b-token"},
]

test_bank_state = {
    "balances": test_bank_state_balances,
    "denom_metadata": [],
    "params": {},
    "supply": test_bank_state_supply,
}

test_app_state = {
    "airdrop": {},
    "auth": {},
    "authz": {},
    "bank": test_bank_state,
    "capability": {},
    "crisis": {},
    "distribution": {},
    "evidence": {},
    "feegrant": {},
    "genutil": {},
    "gov": {},
    "ibc": {},
    "mint": {},
    "params": {},
    "slashing": {},
    "staking": {},
    "transfer": {},
    "upgrade": {},
    "vesting": {},
    "wasm": {},
}

test_genesis_data = {
    "app_hash": {},
    "app_state": test_app_state,
    "chain_id": "test",
    "consensus_params": {},
    "genesis_time": "",
    "initial_height": "",
    "validators": [],
}
