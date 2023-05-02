FROM node:latest

WORKDIR /app


RUN yarn global add nodemon && npm install -g ts-node

COPY package.json ./

RUN yarn

COPY . .
RUN yarn add global prisma

RUN npx prisma generate

# ENV DATABASE_URL ${DATABASE_URL}

# RUN npx prisma migrate dev

EXPOSE 3000

CMD ["yarn", "start"]
