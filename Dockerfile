# Builder
FROM arm64v8/node:14-buster as builder

WORKDIR /app

COPY . .

RUN yarn --network-timeout 600000 && yarn build 
RUN rm -rf node_modules && yarn --production --network-timeout 600000

# Production
FROM arm64v8/node:14-buster as production

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/yarn.lock /app/
COPY --from=builder /app/node_modules app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/.env /app/

WORKDIR /app

EXPOSE 3000

ENTRYPOINT yarn start:prod
