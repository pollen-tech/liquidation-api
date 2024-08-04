<h1>Pollen LMS API V2</h1>

Node version specified in [.node-version](./.node-version).

## Install dependencies

```bash
$ yarn install
```

## Setup

First create a `.env` file from `.env.sample`. Modify it as needed.

### Database

Use the postgers service in `build/docker/docker-compose.yml`.

```bash
$ yarn docker-compose up postgres -d
```

Or just use your Postgres if you already have one (e.g., from
[dev-env-setup](https://github.com/pollen-tech/dev-env-setup))
and create a new database `$POSTGRES_DB`.

Then apply the migrations and seeds:

```bash
# List all available migrations
$ yarn migration:show
# Run the migrations
$ yarn migration:run
# Revert latest migration
$ yarn migration:revert
# Generate a migration:
$ yarn migration:generate
```

```bash
# Run seeds
$ yarn seed:run
```

### Run the app

You can also use `pm2` for this.

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
