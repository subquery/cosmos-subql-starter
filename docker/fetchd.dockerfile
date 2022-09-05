FROM fetchai/fetchd:0.10.6

USER root

WORKDIR /workdir

SHELL [ "/bin/bash", "-c" ]

ENV DEBIAN_FRONTEND noninteractive

ARG fetchd_version="0.10.6"
ENV FETCHD_VER=${fetchd_version}

ARG golang_version="1.18.5"
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

########################
### setup local node ###
########################

COPY ./scripts/fetchd-entrypoint.sh /scripts_docker/entrypoint.sh
COPY ./scripts/00_setup_fetchd_local.sh /scripts_docker/00_setup_fetchd_local.sh
ENV VALIDATOR_KEY_FILE="/scripts_docker/${VALIDATOR_KEY_FILE}"

EXPOSE 26657

ENTRYPOINT ["/bin/bash", "/scripts_docker/entrypoint.sh"]
