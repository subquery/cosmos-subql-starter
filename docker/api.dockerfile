FROM node:16-slim AS builder

RUN apt-get update && apt-get install -y tree

WORKDIR /build

# declare path args
ARG subql_path=./subql
ARG query_pkg_path=${subql_path}/packages/query
ARG subql_package_json_path=${subql_path}/package.json
ARG subql_yarn_lock_path=${subql_path}/yarn.lock

# add the dependencies
ADD $subql_package_json_path $subql_yarn_lock_path /build/

# add the remaining parts of the produce the build
COPY $subql_path /build/

# TODO:
#RUN yarn install --frozen-lockfile
RUN yarn install
RUN yarn build

FROM onfinality/subql-query:v1.4.0

WORKDIR /app

COPY --from=builder /build/packages/query/dist /app/dist
COPY --from=builder /build/packages/query/bin /app/bin
COPY --from=builder /build/packages/query/package.json /app/
COPY --from=builder /build/node_modules /app/node_modules

COPY --from=builder /build/packages/common/dist /app/node_modules/@subql/common
COPY --from=builder /build/packages/utils/dist /app/node_modules/@subql/utils

ENTRYPOINT ["/sbin/tini", "--", "yarn", "start:prod"]
