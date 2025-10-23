FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 7001

CMD ["npm", "run", "start:dev"]
