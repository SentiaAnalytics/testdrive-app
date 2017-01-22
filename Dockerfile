FROM node:7.4
RUN npm i -g serve
WORKDIR /app

ADD build build

EXPOSE 80

CMD serve -p 80 build
