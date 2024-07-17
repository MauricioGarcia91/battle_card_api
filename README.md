# Battle Card API

## Description

`battle_card_api` is an API developed with Node.js and Express that allows managing battle cards and simulating battles between them. The API uses PostgreSQL with TypeORM for database management and follows a hexagonal architecture.

## Features

The API provides the following features:

- **Create a card**
- **Get a card by ID**
- **Update or delete a card by ID**
- **Search for a list of cards** with optional filters by type, name, and result limit. By default, it returns five results, but this can be modified to two or ten results.
- **Simulate a battle** between two cards
- **Get suggestions of cards** that are weaker or stronger for a card type
- **Search for card types**

## Prerequisites

- [Node.js v20](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [NVM](https://github.com/nvm-sh/nvm)

## Technologies

- Node
- Express
- Zod
- Jest
- PostgreSQL
- TypeORM

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/MauricioGarcia91/battle_card_api.git
   cd battle_card_api
   ```

2. Use the correct Node.js version:

   ```bash
   nvm use
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage Suggestion

### Check Port Usage

By default, this application will run on port 4001 and is configured to connect to the `battle_card_db`.

1. Load the environment variables:

   ```bash
   npm run load-dev-env
   ```

2. Start the Docker containers:

   ```bash
   docker-compose up -d
   ```

   The `docker-compose` provide a container with: `battle_card_api` exposes on port `4001` and `battle_card_db` exposes on port `5433`

## Development Mode

### Check Port Usage

By default, this application runs on port 4000 and is configured to connect to the `battle_card_db` in docker container.

1. Start the Docker containers to start the database:

   ```bash
   docker-compose up
   ```

   The `docker-compose` exposes the `battle_card_db` on port `5433`.

2. To start the API in development mode:

   ```bash
   npm run install
   ```

3. To start the API in development mode:

   ```bash
   npm run dev
   ```

   This will connect runs on port 4000 and load the database from the Docker container.

4. To run the tests:

   ```bash
   npm run test
   ```

   The tests are implemented using Jest.

## Architecture

The API follows a hexagonal architecture composed of:
**Domain**: The core of the application where the business logic and main entities are defined.

- **Adapters**: This layer handles the input and output of the application, including HTTP controllers, database repositories, and validation schemas for HTTP request inputs.
- **Use-Cases**: This layer defines the application logic that orchestrates the domain operations, using the entities and services defined in the domain.

## Image Storage Decision

Upon analyzing the application, it can be noted that the decision was made to store the URLs of the card images provided by third parties in the database. However, if this were a production application, it would be ideal to store the images in a self-managed bucket to avoid dependency on third parties, and the URL should point to the created bucket.

## Documentation

For more information about the API, visit [/docs](http://localhost:4000/docs) where Swagger is available in local server or using docker-compose [/docs](http://localhost:4001/docs)
