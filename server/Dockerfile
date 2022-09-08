FROM node:16.17

WORKDIR /usr/app

COPY . .

WORKDIR /usr/app/server

RUN npm i

RUN npx prisma migrate dev

# RUN npx prisma migrate dev
EXPOSE 3000

CMD [ "npm", "run", "dev" ]