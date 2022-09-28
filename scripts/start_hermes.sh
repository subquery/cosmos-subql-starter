#!/bin/sh

# this script bootstrap the hermes relayer
# it does import keys on each chains from the env variables mnemonics
# create necessary clients / channels / connections (all from the `hermes create channel` calls)
# and start listening for packets to relay.

set -ex

if [ "$(hermes --config /root/.hermes/config.toml --json keys list fetchchain | jq '.status == "success" and (.result|length > 0)')" ]; then
    hermes keys restore fetchchain -m "${FETCH_RELAYER_MNEMONIC}"
fi

if [ "$(hermes --config /root/.hermes/config.toml --json keys list wasmchain | jq '.status == "success" and (.result|length > 0)')" ]; then
    hermes keys restore wasmchain -m "${WASM_RELAYER_MNEMONIC}"
fi

if [ "$(hermes --config /root/.hermes/config.toml --json query channels fetchchain | jq '.status == "success" and (.result|length > 0)')" ]; then
    hermes create channel fetchchain wasmchain --port-a transfer --port-b transfer -o unordered
fi

hermes start