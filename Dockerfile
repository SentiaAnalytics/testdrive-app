FROM node:7.4
RUN npm i -g yarn

WORKDIR /app

ADD build build
COPY server.js server.js
COPY package.json server.json

RUN yarn

EXPOSE 80

CMD yarn run serve
