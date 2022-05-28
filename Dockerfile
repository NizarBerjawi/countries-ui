FROM node:16.15-alpine3.15

RUN apk add --no-cache \
    vim \
    git
    
WORKDIR /app

ENTRYPOINT ["./docker-entrypoint.sh"]