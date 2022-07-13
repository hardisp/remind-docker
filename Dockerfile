FROM node:alpine
# FROM [IMAGE]:[WILL_RUN_IN_OS]

COPY . /app

WORKDIR /app 
# WORDIR should be a base path

CMD node app.js
