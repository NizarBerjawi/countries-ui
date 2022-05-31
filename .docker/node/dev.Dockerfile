FROM node:16.15-alpine3.15

LABEL maintainer="nizarberjawi12@gmail.com"

RUN apk add --no-cache \
    vim \
    git

WORKDIR /app
