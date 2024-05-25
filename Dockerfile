FROM node:18-slim as base
ARG env

FROM base AS builder
WORKDIR /webapps
COPY package.json /webapps
RUN yarn install && npm i sharp
ADD . .
RUN yarn build:$env

FROM base AS runner
WORKDIR /webapps
COPY --from=builder /webapps .