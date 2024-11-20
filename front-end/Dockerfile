FROM node:20-alpine AS development
WORKDIR /app

RUN apk add --no-cache bash

COPY package.json package-lock.json ./


RUN npm install --verbose --loglevel verbose

COPY . .

EXPOSE 3000

CMD ["", "run", "dev"]

FROM node:22-alpine AS dependencies
WORKDIR /app

COPY package.json package-lock.json ./

RUN  ci

FROM node:22-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN  run build


FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

EXPOSE 3000

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=dependencies /app/node_modules ./node_modules

CMD ["npm", "start"]