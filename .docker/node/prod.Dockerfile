FROM node:16.15-alpine3.15

LABEL maintainer="nizarberjawi12@gmail.com"

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build:prod


