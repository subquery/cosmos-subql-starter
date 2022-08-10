#!/bin/bash

# CLUSTER=mainnet-v3
# NAMESPACE=subquery
# EXTERNAL_SECRETS_SA=m-v3-london-ext-secrets@fetch-ai-mainnet-v3.iam.gserviceaccount.com
# GCP_PROJECT=fetch-ai-mainnet-v3

# CLUSTER=testnet-v3
# NAMESPACE=subquery
# EXTERNAL_SECRETS_SA=t-v3-london-ext-secrets@fetch-ai-testnet-v3.iam.gserviceaccount.com
# GCP_PROJECT=fetch-ai-testnet-v3

CLUSTER=sandbox
NAMESPACE=subquery
EXTERNAL_SECRETS_SA=sandbox-london-b-ext-secrets@fetch-ai-sandbox.iam.gserviceaccount.com
GCP_PROJECT=fetch-ai-sandbox

mkdir -p keys
FILE=keys/db.json
SECRET="${CLUSTER}_${NAMESPACE}_postgres"

echo "{" >$FILE
echo '  "POSTGRES_USER": "'$(tr -dc A-Za-z </dev/urandom | head -c 32)'",' >>$FILE
echo '  "POSTGRES_PASSWORD": "'$(tr -dc A-Za-z0-9 </dev/urandom | head -c 32)'"' >>$FILE
echo "}" >>$FILE

if [[ ! $(gcloud secrets describe $SECRET --project=${GCP_PROJECT} 2>/dev/null) ]]; then
    gcloud secrets create $SECRET --replication-policy=automatic --project=$GCP_PROJECT
    gcloud secrets add-iam-policy-binding $SECRET --member="serviceAccount:$EXTERNAL_SECRETS_SA" --role="roles/secretmanager.secretAccessor" --project=$GCP_PROJECT
fi
gcloud secrets versions add $SECRET --data-file=$FILE --project=$GCP_PROJECT

rm -rf keys
