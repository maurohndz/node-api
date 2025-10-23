FROM node:20-alpine

# Instala bash (dotenv-cli lo requiere en Alpine)
RUN apk add --no-cache bash

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copia el resto del código

EXPOSE 7001

CMD ["npm", "run", "start:dev"]
