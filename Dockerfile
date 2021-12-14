# Builder
FROM arm64v8/node:14-buster as builder

WORKDIR /app

COPY . .

ARG DATABASE_URL mysql://fine:fine@192.168.100.130:3306/board_rank_dev

RUN yarn --network-timeout 600000 && yarn prisma:migrate && yarn build 
RUN rm -rf node_modules && yarn --production --network-timeout 600000

# Production
FROM arm64v8/node:14-buster as production

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/yarn.lock /app/
COPY --from=builder /app/node_modules app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prisma /app/prisma

WORKDIR /app

ENV NODE_ENV production
ENV DATABASE_URL mysql://fine:fine@192.168.100.130:3306/board_rank_dev
ENV OAUTH_GOOGLE_CLIENT_ID 47989076113-v9i17kn2i3bku3ko07pu287du8akot88.apps.googleusercontent.com
ENV JWT_SECRET JWT_SECRET

EXPOSE 3000

ENTRYPOINT yarn start:prod
