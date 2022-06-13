FROM node:16-buster-slim AS base

WORKDIR /usr/share/app

ENV PATH=/usr/share/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm ci && \
    npm cache clean --force


FROM base AS development

ENV NODE_ENV=development

RUN npm install --development

COPY . .

EXPOSE 5000

CMD ["nodemon", "src/server.js"]
