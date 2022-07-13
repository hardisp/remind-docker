FROM node:alpine
COPY . /app
# should be a base path
WORKDIR /app 
CMD node app.js
