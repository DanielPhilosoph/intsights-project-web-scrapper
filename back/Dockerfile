FROM node:16

WORKDIR /usr/back

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 3004

CMD [ "node", "./index.js" ]