FROM node:16

WORKDIR /usr/front

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]