#!/bin/bash

echo "Sending request to $HOST"

response=$(curl  $HOST  -s -w "%{http_code}" \
  -H 'accept: */*' \
  -H 'content-type: application/json' \
  --data-raw '{"operationName":"sanityCheck","variables":{},"query":"query sanityCheck {\n  blocks {\n    totalCount\n  }\n}\n"}'
)

status_code=$(tail -n1 <<< "$response")
content=$(sed '$ d' <<< "$response")

echo "Obtained response - $content"
echo "Obtained status code - $status_code"

if [[ "$status_code" -ne "200" ]]; then
    exit 1 
else
    echo "Sending push to StatusCake"
    curl "${STATUSCAKE_ENDPOINT}" 
    exit 0
fi
