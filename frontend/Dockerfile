FROM node:14.16.1-alpine3.13

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

# Put Run make dir after set user to make that user as directory owner
RUN mkdir data

COPY package*.json .
RUN npm install
COPY . .

ENV API_URL=http://api.myapp.com/

EXPOSE 3000

#CMD npm start

CMD ["npm", "start"]

# ENTRYPOINT ["npm", "start"]