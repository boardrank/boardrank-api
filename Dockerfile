# Builder
FROM arm64v8/node:16-buster as builder

WORKDIR /app

COPY . .

RUN yarn --network-timeout 600000 && yarn build 
RUN yarn --production --network-timeout 600000

# Production
FROM arm64v8/node:16-buster as production

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/yarn.lock /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prisma /app/prisma

WORKDIR /app

ENV NODE_ENV production
ENV DATABASE_URL mysql://boardrank:boardrank@192.168.100.92:3306/board_rank
ENV OAUTH_GOOGLE_CLIENT_ID 47989076113-v9i17kn2i3bku3ko07pu287du8akot88.apps.googleusercontent.com
ENV JWT_SECRET BOARD_RANK_JWT_SECRET
ENV FIREBASE_STORAGE_BUCKET board-rank.appspot.com
ENV GLOBAL_PREFIX boardrank/api

EXPOSE 3000

ENTRYPOINT yarn start:prod
