# Transect Explorer

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:A-dith-ya/transect-explorer.git
   ```

2. Install the dependencies for the app:

   ```bash
   cd app/
   npm install
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

4. Run the server on port 8080, postgres on port 5432:

   ```bash
   docker compose up
   ```

5. Rebuild docker images after making changes to code:

   ```bash
   docker compose build
   ```

6. Stop the server and postgres:

   ```bash
   docker compose down
   ```

## API Documentation

The API documentation is generated using the OpenAPI Specification and is accessible at [Swagger UI](http://localhost:8080/swagger-ui/index.html).
