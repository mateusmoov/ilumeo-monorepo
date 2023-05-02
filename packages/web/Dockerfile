FROM node:latest

WORKDIR /app

COPY package.json ./

RUN yarn
RUN yarn global add vite

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]