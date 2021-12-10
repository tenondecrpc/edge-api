# Testing APIRest with express and prisma

This example shows how to implement integration tests using [Express](https://expressjs.com/), [Docker](https://www.docker.com), [Jest](https://jestjs.io/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/test.db`](./prisma/test.db).

## Getting started

### 1. Download example and install dependencies

Download this example:

```
curl -L -o edge-api.tar.gz https://codeload.github.com/tenondecrpc/edge-api/zip/refs/heads/master
```

Install yarn dependencies:

```
cd edge-api
yarn install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone https://github.com/tenondecrpc/edge-api.git --depth=1
```

Install yarn dependencies:

```
cd edge-api
yarn install
```

</details>

## Run in local server

### 1. Create database

Run the following command to create your SQLite database file. This also creates the `User` table that is defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
yarn prisma-migrate
```

### 2. Start the REST API server

Rename the `.env.example` to `.env` and execute this command to start the server:

```
yarn start
```

The server is now running on `http://localhost:4000`. You can send the API requests implemented in `server.js`, e.g. [`http://localhost:4000/find`](http://localhost:4000/find).

### 3. Testing the endpoints

The tests are located in the `__tests__` folder. In these you will find tests handled for cases if a same user is added twice and also to check if the users added are obtained correctly.

The tests can be run using:

```
yarn test
```

## Run in docker

### 1. Create docker image

Rename the `.env.example` to `.env`.
Run the following command to create your Docker image.

```
yarn docker-compose
```

### 2. Create docker migrate

Run the following command to create your SQLite database file. This also creates the `User` table that is defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
yarn docker-migrate
```

### 3. Testing the endpoints

The tests are located in the `__tests__` folder. In these you will find tests handled for cases if a same user is added twice and also to check if the users added are obtained correctly.

The tests can be run using:

```
yarn docker-test
```

## Documentation

The documentation is available in the `resources` folder, containing the files for postman and swagger
Example: [Swagger Doc](https://app.swaggerhub.com/apis-docs/tenondecrpc/edge-api/1.0.0)
