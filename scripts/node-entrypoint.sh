#!/bin/sh
set -e

# perform any updates that are required based on the environment variables
if [[ ! -z "${START_BLOCK}" ]]; then
    echo "[Config Update] Start Block: ${START_BLOCK}"
    yq -i '.dataSources[].startBlock = env(START_BLOCK)' project.yaml
fi

if [[ ! -z "${CHAIN_ID}" ]]; then
    echo "[Config Update] Chain ID: ${CHAIN_ID}"
    yq -i '.network.chainId = env(CHAIN_ID)' project.yaml
fi

if [[ ! -z "${NETWORK_ENDPOINT}" ]]; then
    echo "[Config Update] Network Endpoint: ${NETWORK_ENDPOINT}"
    yq -i '.network.endpoint = strenv(NETWORK_ENDPOINT)' project.yaml
fi

if [[ ! -z "${LEGACY_BRIDGE_CONTRACT_ADDRESS}" ]]; then
    echo "[Config Update] Legacy Bridge Contract Address: ${LEGACY_BRIDGE_CONTRACT_ADDRESS}"
    yq -i '.dataSources[].mapping.handlers |= map(select(.handler == "handleLegacyBridgeSwap").filter.values.contract = env(LEGACY_BRIDGE_CONTRACT_ADDRESS))' project.yaml
fi

# run the main node
exec /sbin/tini -- /usr/local/lib/node_modules/@subql/node-cosmos/bin/run
