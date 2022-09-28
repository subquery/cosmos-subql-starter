FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl jq

RUN curl -L https://github.com/informalsystems/ibc-rs/releases/download/v0.12.0/hermes-v0.12.0-x86_64-unknown-linux-gnu.tar.gz -o hermes-v0.12.0.tar.gz && \
    tar -C /usr/local/bin -vxzf hermes-v0.12.0.tar.gz && \
    rm hermes-v0.12.0.tar.gz

ENTRYPOINT bash