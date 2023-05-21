# Storefront-Backend
Storefront Backend project for Udacity.

# How to Setup and Connect to the Database
First, setup the environment variables by creating a .env file in the project root directory with the following content:

*.env*
```
POSTGRES_HOST=127.0.0.1
POSTGRES_USER = dev_user
POSTGRES_PASSWORD = password123
POSTGRES_DB = storefront_backend
POSTGRES_TEST_DB = storefront_backend_test
BCRYPT_PASSWORD = your-secret-password
SALT_ROUNDS = 10
PEPPER = 469532
TOKEN_SECRET = udacity
ENV = test
```

Run the included docker-compose.yml in order to set up the PostgreSQL server by running

`docker compose -f .\docker-compose.yml up`

This will configure and start a Docker container in which the PostgreSQL server will run.
In order to connect to the database, begin a shell session in the Docker container by running

`docker exec -it storefront-backend-postgres-1 bash`

Then, in the Docker shell, change to the postgres user and connect to the database by running

`su postgres & psql -U dev_user -d storefront_backend -h localhost -p 5432`

You should now be connected to the storefront_backend database, which is currently empty. Feel free to check by running `\dt` in the Docker terminal.

Create the test db in the Docker terminal by running

`CREATE DATABASE storefront_backend_test;`

Migrate up the database by running `db-migrate up` from a new terminal set in the project root directory. Verify the migration was successful by going back to the Docker terminal and again running `\dt`.

# What Ports The Backend and Database are Running On
Using the provided docker-compose.yml file, the PostgreSQL server will be running on port 5432. The storefront backend express app is configured to run on port 3000.

# Package installation instructions
Required packages can be installed simply by running `npm ci` in a terminal set in the project root directory.
