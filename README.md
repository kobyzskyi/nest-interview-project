# Interview Test Project

## Installation

```bash
$ cp .env.dist .env
$ npm ci
```

## Running the app

```bash
# docker
$ docker-compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Service requirements
1. There is CRUD for categories
2. There is CRUD for products
3. If a category is created without a name it should be generated automatically with the pattern "Unnamed category {next number}"
4. There is an endpoint to get all products from a category
5. There is an endpoint to add bulk products to a category
6. It's not possible to remove a category if it has products
7. Every product type store his own data structure

