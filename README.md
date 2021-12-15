<p align="center">
  <a href="https://boardrank.kr" target="blank"><img src="https://raw.githubusercontent.com/boardrank/boardrank-api/main/docs/boardrank.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Boardrank API

## Description

이 프로젝트는 [Boardrank API](https://api.boardrank.kr/swagger-ui) 입니다.

## Skill

- Nest
- Typescript
- Prisma
- Swagger
- Jwt 인증

## Usage

### Firebase Service Account Key

Firebase Console에서 서비스 계정 키 생성 후 다운받은 파일을 /src/firebase/serviceAccountKey.json으로 이동

### Installation

```bash
$ yarn
```

### Build

```bash
$ yarn build
```

### Local Enviorment

```bash
# local mode
$ yarn start:local
```

### Development Enviorment

```bash
# development mode
$ npm run start

# development watch mode
$ npm run start:dev
```

### Production Environment

```bash
# production mode
yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma

### Pull Prisma schema

```bash
# pull schema and generate from database
$ prisma:pull
```

### Migrate Prisma schema

```bash
# migrate prisma schema to database
$ prisma:migrate
```

## Open API Generator

```bash
# server start local mode
$ yarn start:local

# other terminal
# generate open api class and interface
$ yarn generate:api
```
