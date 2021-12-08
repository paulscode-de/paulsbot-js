FROM node:latest

RUN mkdir /paulsbot
WORKDIR /paulsbot
COPY ./src /paulsbot
RUN npm install

CMD ["npm","run", "start"]