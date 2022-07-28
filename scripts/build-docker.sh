#!/bin/bash
set -e

version=$(git describe --always --tags --dirty=-wip)
registry="gcr.io/fetch-ai-sandbox"
image="subquery-node"

full_tag="${registry}/${image}:${version}"

# make sure all the changes have been committed
if [[ "${full_tag}" == *wip ]]; then
	echo "You have uncommitted changes - please commit first before using this script"
	exit 1
fi

# build the image
docker build -t "${full_tag}" .

# push the image to the registry
docker push "${full_tag}"
