FROM node:7.4
RUN npm i -g yarn
WORKDIR /app


ADD build build
ADD config config
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production

EXPOSE 80
b
CMD serve -p 80 build
