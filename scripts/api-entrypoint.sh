#!/bin/sh
set -e

# TODO: fix in /ready HTTP endpoint in the subql node instead!
echo "sleeping for 5s - waiting for subql node to complete DB initialization..."
sleep 5

exec /sbin/tini -- yarn start:prod
