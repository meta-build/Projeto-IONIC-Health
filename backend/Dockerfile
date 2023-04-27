FROM node:16.15-alpine

WORKDIR /usr/src/backend

RUN apk update && \
    apk add mysql-client

COPY package.json tsconfig.json package-lock.json ./

RUN npm install

EXPOSE 3000

CMD [ "tail", "-f", "/dev/null" ]
