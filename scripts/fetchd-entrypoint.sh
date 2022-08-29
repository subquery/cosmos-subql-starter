#!/bin/bash
set -e 

if [ ! -f "~/.fetchd/config/genesis.json" ]; then
    chmod +x /scripts_docker/00_setup_fetchd_local.sh
    /scripts_docker/00_setup_fetchd_local.sh
fi

fetchd start --rpc.laddr tcp://0.0.0.0:26657 | tee -a fetchd.logs