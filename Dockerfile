FROM node:18.18

WORKDIR /usr/Portfolio

COPY package.json ./

RUN npm install

COPY . ./

RUN rm -rf ./.next

RUN rm -rf ./api

CMD npm run deploy

EXPOSE 3000
