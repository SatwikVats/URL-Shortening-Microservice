# syntax=docker/dockerfile:1

FROM --platform=linux/amd64 node:alpine

WORKDIR /url-shortening-microservice

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "index.ts" ]