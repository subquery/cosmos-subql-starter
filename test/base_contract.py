import unittest, base, requests, os
from cosmpy.aerial.contract import LedgerContract


class BridgeContract(base.Base):
    contract = None

    @classmethod
    def setUpClass(cls):
        super(BridgeContract, cls).setUpClass()
        url = "https://github.com/fetchai/fetch-ethereum-bridge-v1/releases/download/v0.2.0/bridge.wasm"
        if not os.path.exists("../.contract"):
            os.mkdir("../.contract")
        try:
            temp = open("../.contract/bridge.wasm", "rb")
            temp.close()
        except:
            contract_request = requests.get(url)
            file = open("../.contract/bridge.wasm", "wb")
            file.write(contract_request.content)
            file.close()

        # LedgerContract will attempt to discover any existing contract having the same bytecode hash
        # see https://github.com/fetchai/cosmpy/blob/master/cosmpy/aerial/contract/__init__.py#L74
        cls.contract = LedgerContract("../.contract/bridge.wasm", cls.ledger_client)
        
        # deploy will store the contract only if no existing contracts was found during init.
        # and it will instantiate the contract only if contract.address is None
        # see: https://github.com/fetchai/cosmpy/blob/master/cosmpy/aerial/contract/__init__.py#L168-L179
        cls.contract.deploy(
            {
                "cap": "250000000000000000000000000",
                "reverse_aggregated_allowance": "3000000000000000000000000",
                "reverse_aggregated_allowance_approver_cap": "3000000000000000000000000",
                "lower_swap_limit": "1",
                "upper_swap_limit": "1000000000000000000000000",
                "swap_fee": "0",
                "paused_since_block": 18446744073709551615,
                "denom": "atestfet",
                "next_swap_id": 0
            },
            cls.validator_wallet
        )


if __name__ == '__main__':
    unittest.main()
