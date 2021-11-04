# Builder
FROM arm64v8/node:14-buster as builder

WORKDIR /app

COPY . .

RUN yarn && yarn prisma:migrate && yarn build

RUN rm -rf node-modules && yarn --production

# Run
FROM arm64v8/node:14-alpine

WORKDIR /app

COPY --from=builder /app/* /app/

ENTRYPOINT yarn start:prod
