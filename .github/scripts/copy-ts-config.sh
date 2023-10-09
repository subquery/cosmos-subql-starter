#!/bin/bash

# This file copies over a modified TS config that works with workspaces so we can build all projects

set -e

for DEST_PATH in ./*/*/; do

  SRC="./.github/scripts/ci.tsconfig.json"
  DEST="${DEST_PATH}tsconfig.json"

  [ -f "$DEST" ] && cp "$SRC" "$DEST"
done
