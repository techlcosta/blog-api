FROM node:20 as builder
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3330

CMD ["yarn", "start"]
