FROM node:alpine
# FROM [IMAGE]:[OS_RUNNING_THE_IMAGE]

COPY . /app

WORKDIR /app 
# WORDIR should be a base path

CMD node app.js
