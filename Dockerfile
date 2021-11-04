# Builder
FROM arm64v8/node:14-buster as builder

WORKDIR /app

COPY . .

RUN yarn && yarn build

# Production
FROM arm64v8/node:14-buster as production

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/yarn.lock /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/.env /app/

WORKDIR /app

EXPOSE 3000

ENTRYPOINT yarn --production && yarn start:prod
