FROM node:16.15-alpine3.15 as BUILDER

LABEL maintainer="nizarberjawi12@gmail.com"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

FROM nginx:1.21.6-alpine

WORKDIR /var/www/html/public

COPY .docker/nginx/http.d/default.prod.conf /etc/nginx/http.d/default.conf
COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=BUILDER /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]