FROM node:7.4
RUN npm i -g yarn

WORKDIR /app

ADD build build
COPY server.js server.js
COPY package.json package.json

RUN yarn

ENV PORT 80
ENV API_SERVER = http://api-server

EXPOSE 80

CMD yarn run serve
