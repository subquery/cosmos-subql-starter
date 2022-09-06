#!/bin/bash
set -e 

# Initialise test chain
# Clean state 
rm -rf ~/.fetchd/*

# Configure fetchcli
fetchd config chain-id testing
fetchd config output json
fetchd config keyring-backend test

# SETUP LOCAL CHAIN
# Initialize the genesis.json file that will help you to bootstrap the network
fetchd init --chain-id=testing testing
sed -i "s/stake/$TOKEN/" ~/.fetchd/config/genesis.json

# Enable rest API
sed -i '/^\[api\]$/,/^\[/ s/^enable = false/enable = true/' ~/.fetchd/config/app.toml
# Allow all origins on RPC endpoint
sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = \["\*"\]/' ~/.fetchd/config/config.toml

# update the block parameters to match mainnet
cp ~/.fetchd/config/genesis.json ~/.fetchd/config.genesis.json.bak
jq '.consensus_params.block.max_gas = "3000000" | .consensus_params.block.max_bytes = "300000" | .consensus_params.evidence.max_bytes = "300000"' ~/.fetchd/config.genesis.json.bak > ~/.fetchd/config/genesis.json

# Create a key to hold your validator account
(echo "$FETCHMNEMONIC"; echo "$PASSWORD"; echo "$PASSWORD") | fetchd keys add validator --recover
# Add validator to genesis block and give him some stake
echo "$PASSWORD" | fetchd add-genesis-account $(fetchd keys show validator -a) 1000000000000000000000000$TOKEN
# add some fund to relayer and admin accounts (1MFET)
fetchd add-genesis-account fetch1vmvxe6xgkqfe9fsp63p4f5pgp0jqe7h6505pnk 1000000000000000000000000$TOKEN
fetchd add-genesis-account fetch1ka9j6a8u0lnt8rm86d9ntyurm39jylcu3dstng 1000000000000000000000000$TOKEN

# Generate the transaction that creates your validator
(echo "$PASSWORD"; echo "$PASSWORD"; echo "$PASSWORD") | fetchd gentx validator 1000000000000000000$TOKEN --keyring-backend test --chain-id testing

# Add the generated bonding transaction to the genesis file
fetchd collect-gentxs
