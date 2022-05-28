#!/bin/sh

if [ -z "${USER}" ]; then
  echo "We need USER to be set!"; exit 100
fi

# if both not set we do not need to do anything
if [ -z "${UID}" -a -z "${GID}" ]; then
    echo "Nothing to do here." ; exit 0
fi

# We free up UID 1000
deluser --remove-home node

addgroup --gid ${GID} ${USER}
adduser \
  --uid ${UID} \
  --ingroup ${USER} \
  --gecos ${USER} \
  --shell /bin/sh \
  --disabled-password ${USER}

chown -R ${UID}:${GID} /app

su ${USER}

cd /app

exec "$@"
