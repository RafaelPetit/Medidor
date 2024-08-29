FROM node:20

WORKDIR /usr/src/app

COPY . .
COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

RUN rm -rf ./src

EXPOSE 3000

CMD ["npm", "run", "start:prod"]