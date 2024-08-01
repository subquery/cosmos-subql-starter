# Subql Examples

| A collection of examples on how to interact with the Subql. |
| --------------------------------------------------------------------------------------------- |

Please refer [here](./README.md) to set up environment to run these examples.

## Basic listening for transactions of an address
```graphql
query {
  messages(
    filter: {
      or: [
        {
          from: {
            equalTo: "your_address"
          }
        },
        {
          to: {
            equalTo: "your_address"
          }
        }
      ]
    }
  ) {
    nodes {
      id,
      blockHeight,
      from,
      to,
      txHash,
      type,
      tokenContractAddress,
      denom
    }
  }
}
```

At this example, we write a query to list transactions that executed by an a address. The key here is how we define the query. In the `filter` field, we take option `or` for `from` and `to` indicate that the query will get all transactions which sender or receiver is `your_address`.

<div id="result">The result includes these fields: </div>

```ts
/**
 * @id: The id of result, it's in form: txHash-idx (idx is index of the message within the transaction)
 * @blockHeight: block height of the transaction
 * @from: sender of transaction
 * @to: receiver of transaction
 * @txHash: transaction hash code
 * @type: either "native" or "cw20"
 * @tokenContractAddress: address of contract that executed transaction if type is cw20
 * @denom: token denomination
 */
```

## Basic listening for transactions of smart contract

```graphql
query {
  messages(
    filter: {
      tokenContractAddress: {
        equalTo: "your_contract_address"
      },
    }
  ) {
    nodes {
      id,
      blockHeight,
      from,
      to,
      txHash,
      type,
      tokenContractAddress,
      denom
    }
  }
}
```

At this example, we write a query to listen for transactions of a smart contracts. We define the `filter` field with field `tokenContractAddress` to get transactions of `your_contract_address`.

The result still has similar fields like example [above](#result).