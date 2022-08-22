#!/bin/bash
set -e

image=$1
if [[ $image == "" ]]; then
  echo "Usage: build-docker.sh <image name> <dockerfile path> [git root]"
    echo ""
    echo "Examples:"
    echo "  ./build-docker.sh subquery-node ./docker/node.dockerfile"
    echo "  ./build-docker.sh subquery-api ./docker/api.dockerfile ./subql"
  exit 1
fi

dockerfile_path=${2:-"$(pwd)/Dockerfile"}
git_root=${3:-"."}

version=$(cd ${git_root} && git describe --always --tags --dirty=-wip | sed -e "s,/,_,g")
registry="gcr.io/fetch-ai-sandbox"

full_tag="${registry}/${image}:${version}"

# make sure all the changes have been committed
if [[ "${full_tag}" == *wip ]]; then
	echo "You have uncommitted changes - please commit first before using this script"
	exit 1
fi

# build the image
docker build -t "${full_tag}" -f "${dockerfile_path}" .

# push the image to the registry
docker push "${full_tag}"
