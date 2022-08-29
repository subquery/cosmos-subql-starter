FROM ubuntu:20.04 as base

USER root

WORKDIR /workdir

SHELL [ "/bin/bash", "-c" ]

ENV DEBIAN_FRONTEND noninteractive

ARG fetchd_version="0.10.0-rc1"
ENV FETCHD_VER=${fetchd_version}

ARG golang_version="1.16.6"
ENV GOLANG_VER=${golang_version}

ARG fetchd_password="12345678"
ENV PASSWORD=${fetchd_password}

ARG token="atestfet"
ENV TOKEN=${token}

#ARG validator_key_file="validator.key"
#ENV VALIDATOR_KEY_FILE=${validator_key_file}

#ARG validator_key_pwd="12345678"
#ENV VALIDATOR_KEY_PWD=${validator_key_pwd}
ENV FETCHMNEMONIC="nut grocery slice visit barrel peanut tumble patch slim logic install evidence fiction shield rich brown around arrest fresh position animal butter forget cost"

####################
### dependencies ###
####################


# utils
RUN apt-get update && apt-get install -y wget make curl git jq python3 python3-pip
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

# golang
RUN wget https://golang.org/dl/go${GOLANG_VER}.linux-amd64.tar.gz && \
    tar -xzvf go${GOLANG_VER}.linux-amd64.tar.gz -C /usr/local && \
    mkdir /root/go
ENV PATH="${PATH}:/usr/local/go/bin:/root/go/bin"

# fetchd (https://docs.fetch.ai/ledger_v2/building/)
RUN git clone https://github.com/fetchai/fetchd.git && cd fetchd && \
    git checkout v${FETCHD_VER} && \
    make install && fetchd version

########################
### setup local node ###
########################

COPY ./scripts/fetchd-entrypoint.sh /scripts_docker/entrypoint.sh
COPY ./scripts/00_setup_fetchd_local.sh /scripts_docker/00_setup_fetchd_local.sh
ENV VALIDATOR_KEY_FILE="/scripts_docker/${VALIDATOR_KEY_FILE}"

EXPOSE 26657

ENTRYPOINT ["/bin/bash", "/scripts_docker/entrypoint.sh"]
