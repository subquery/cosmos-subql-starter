import {getJaccardResult} from "../../../src/mappings/utils";
import {Interface} from "../../../src/types";

const test_payloads = {
  [Interface.CW20] :[
    {
      "name": "test coin",
      "symbol": "TEST",
      "decimals": 6,
      "initial_balances": [{
        "amount": "3000000000000000000000000",
        "address": "admin.address"
      }],
      "mint": {"minter": "admin.address"}
    },
    {
      "name": "test coin",
      "symbol": "TEST",
      "decimals": 6
    },
  ],
  [Interface.LegacyBridgeSwap]: [
    {
      "cap":"250000000000000000000000000",
      "reverse_aggregated_allowance":"3000000000000000000000000",
      "reverse_aggregated_allowance_approver_cap":"3000000000000000000000000",
      "lower_swap_limit":"1",
      "upper_swap_limit":"1000000000000000000000000",
      "swap_fee":"0",
      "paused_since_block":1,
      "denom":"atestfet",
      "next_swap_id":0
    },
    {
      "cap":"250000000000000000000000000",
      "reverse_aggregated_allowance":"3000000000000000000000000",
      "reverse_aggregated_allowance_approver_cap":"3000000000000000000000000",
      "lower_swap_limit":"1",
      "next_swap_id":0
    },
  ],
  [Interface.Uncertain]: [
    {
      "ambiguous_param_one": 1,
      "ambiguous_param_two": 2,
      "ambiguous_param_three": 3,
    },
    {
      "cap": 1,
      "next_swap_id": 0,
      "reverse_aggregated_allowance": 0,
      "decimals": 1
    }
  ]
};

test("test Jaccard result", () => {
  Object.keys(test_payloads).forEach((key) => {
    Object.entries(test_payloads[key]).forEach((value) => {
      const payload = JSON.stringify(value[1], null, 2);
      expect(getJaccardResult(JSON.parse(payload))).toBe(key);
    });
  });
});
