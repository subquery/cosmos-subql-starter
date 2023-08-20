#!/bin/bash

ROOT_PATH=$( dirname -- "$( readlink -f -- "$0"; )"; );
networkrpc_expression="^([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$"
networkname_expression="^[a-zA-Z0-9]{3,50}$"
networkid_expression="^[a-z\-0-9]{3,50}$"

echo -e "\033[0;33m ♨ Generating starter package  \033[0m\n"

check_cosmos_rpc() {
  req=`curl -s ${1}/status `
  NETWORK_ID=`echo $req |jq -r ".result.node_info.network" `
  NETWORK_LATESTBLOCK=`echo $req |jq -r ".result.sync_info.latest_block_height| tonumber" `
  NETWORK_START_SCAN_BLOCK=`echo $req |jq -r ".result.sync_info.latest_block_height| tonumber -100000" `
  NETWORK_NAME=`echo $req |jq -r ".result.node_info.network | split(\"-\")[0] | ascii_downcase" `


  if [ "$NETWORK_ID" != "" ]; then
      return 0
  fi
  return 1
}

read -p '  ✍ Enter netowrk RPC: ' input_networkrpc
while [ "$input_networkrpc" == "" ] || ! check_cosmos_rpc "$input_networkrpc"
do
  echo -e "\033[0;31m  ✘ Incorrect network RPC. Please check twice and send again. \033[0m \n"
  read -p '  ✍ Enter netowrk RPC: ' input_networkrpc
done

echo -e '\n\n   🔨 Generated Subquery params: '
echo -e "\033[0;32m       ✔️  Chain name: ${NETWORK_NAME^} \033[0m"
echo -e "\033[0;32m       ✔️  Chain id: ${NETWORK_ID} \033[0m"
echo -e "\033[0;32m       ✔️  Chain rpc: ${input_networkrpc} \033[0m"
echo -e "\033[0;32m       ✔️  Chain lastblock: ${NETWORK_LATESTBLOCK} \033[0m"


if [ -f "${ROOT_PATH}/${NETWORK_NAME^}" ]; then
    echo -e "\033[0;31m ✘ ${NETWORK_NAME^} starter Already exists. Code will be overwrite \033[0m\n"
    exit 0
fi

read -p "  🚧 Please type Y to continue " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1
fi

echo -e "\033[0;32m    ⚡ Processing \033[0m"

mkdir -p $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter
cp -r $ROOT_PATH/_template/* $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter


sed -i "s/%NETWORK_NAME%/${NETWORK_NAME^}/g" $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter/README.md
sed -i "s/%NETWORK_NAME_LOWERCASE%/${NETWORK_NAME}/g" $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter/package.json
sed -i "s/%NETWORK_NAME%/${NETWORK_NAME^}/g" $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter/package.json
sed -i "s/%NETWORK_ID%/${NETWORK_ID}/g" $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter/project.yaml
sed -i "s/%NETWORK_NAME_LOWERCASE%/${NETWORK_NAME}/g" $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter/project.yaml
sed -i "s~%NETWORK_ENDPOINT_RPC_URL%~${input_networkrpc}~g" $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter/project.yaml
sed -i "s/%NETWORK_STARTBLOCK%/${NETWORK_START_SCAN_BLOCK}/g" $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter/project.yaml
sed -i "s/%NETWORK_DICTIONARY_URL%/https:\/\/api\.subquery\.network\/sq\/subquery\/${NETWORK_NAME}-dictionary/g" $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter/project.yaml


echo -e "\n\n  🎉 Congrats! Project ready\n"
echo -e "You can run your project with commands: \n "
echo -e "cd $ROOT_PATH/${NETWORK_NAME^}/${NETWORK_NAME}-starter && npm install && npm run dev"