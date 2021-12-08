FROM node:14.17.0 AS base
WORKDIR /var/www
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn prisma generate