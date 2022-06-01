FROM node:16.15-alpine3.15

LABEL maintainer="nizarberjawi12@gmail.com"

ARG USER
ARG GID
ARG UID

RUN apk add --no-cache \
    vim \
    git

# We free up UID 1000
RUN deluser \
  --remove-home \
  node

RUN addgroup --gid ${GID} ${USER}
RUN adduser \
  --ingroup ${USER} \ 
  --gecos ${USER} \
  --uid ${UID} \
  --shell /bin/sh \
  --disabled-password ${USER}
  
WORKDIR /places-ui

USER ${USER}