FROM node:14

WORKDIR /app

COPY . /app/

RUN apt-get update && apt-get install -y sqlite3

RUN npm install

EXPOSE 80

RUN mkdir /app/db

RUN touch /app/db/database.sqlite

VOLUME /app/db

RUN node /app/backend/init_db.js

CMD node backend/app.js
