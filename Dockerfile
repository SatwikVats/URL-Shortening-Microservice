# syntax=docker/dockerfile:1

FROM --platform=linux/amd64 node:18-alpine

WORKDIR /url-shortening-microservice

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]