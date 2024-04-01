FROM node:14

WORKDIR /app

COPY . /app/

RUN apt-get update && apt-get install -y sqlite3

RUN npm install

EXPOSE 3002


RUN mkdir /app/db

VOLUME /app/db

RUN node backend/init_db.js

CMD node backend/app.js