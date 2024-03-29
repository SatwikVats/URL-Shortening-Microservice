# URL-Shortening-Microservice

## General Overview:

This is a sophisticated URL shortening service that not only shortens URLs but also provides detailed analytics. This service caters to high traffic, ensuring performance and scalability. Tech stack used for building the service is Node.js and Express.js, along with Typescript. The Databse used here in MongoDB.

## Architecture:

We are following a MVC (Model-View-Controller) architecture here. The modular structure of the repository is as follows:

- `config`: This module contains all the configuration files; which return an object establishing connection with the client.
- `controller`: This module contains all the relevant API business logic. We process the request objects, make queries to the DB, process the queried data and send response as per our needs in the handler functions.
- `middleware`: This module contains all the middleware (request/response interceptors) to be used in our API.
- `model`: This module contains all the model schemas directing the way data is stored in documents. All the CRUD operations takes place here itself. - route: This module defines all the paths to respective API endpoints.
- `utils`: This module contains all the common utility functions to be used in out project.

## User Authentication:

We have two endpoints for registering a new user and signing in the existing user respectively.

- Registration: A new user could signup by passing `username` and `password` keys in the request body.
- Signin: An existing user can signin using username and password, in the request body again. This endpoint also returns an access token to manage sessions in the Frontend.

## Security:

- To ensure security of our APIs and prevent unautorized access, we have a middleware to enable JWT authentication. The access token in the session must be passed as a Bearer Token in the header. Now this token is validated against the secret key given and also userId in the decoded token's payload is matched with the user's userId to ensure only that particular user has access to their URLs and Analytics.
- Also, passwords are encrypted using CryptoJS and stored in the form of hash in the DB.

## URL Shortening Algoritm:

We are using hash where each long URL (key) will be mapped to a 6-digit unique integer(value) and base-64 string equivalent of that integer will be the short URL. To handle expirations and auto-deletion of these short URLs along with the associated analytics, we are using MongoDB TTL indexing. We are mapping each shortURL (stored in `urls` collection) to the `userId` which is the unique ObjectId of the corresponding user in `users` collection.

## Associated Analytics:

- For each short URL, we have an array of objects `clicks`, where each objects contains the timstamp recorded during click and geographical location in the form of longitude and latitude.
- We have an API which provides us time-based analytics in the form of most active hours.

## Caching:

Redis has been implemented to smoothen the URL retrieval process by reducing the load on DB (by reducing the number of queries) and enhancing the performance (query execution time). We have setup the client connection in `redis.ts` under `config` module. Using the same client, we are performing all the operations throughout our project. In this case, Redis takes up the default port of 6379.
To install Redis and run the server on your local machine, follow the offical Redis [documentation](https://redis.io/docs/install/install-redis/).

## Steps to host the server locally:

- Clone the project from Github repository to your local machine.
- Run the following commands on your terminal to initialize npm and install all the relevant packages.

```
npm init
```

```
npm install
```

- Ask the author to share .env file to be used for the project (incase you are using Dokcer since .env variables will be consumed in the container).
- Use the following command and server will be up and running on PORT 8000 of your machine.

```
npm start
```

- Install Redis on your machine by following the steps in the documentation as shared above, and run the following command on your termina.

```
redis-server
```

- You may use RedisInsights to visualize the data stored in Redis.
- Use Postman to test the APIs. You may ask the author for curl scripts of respective endpoints for convenience.

## Steps to host the server locally (using Docker):

- Ensure that you have [Docker Desktop](https://docs.docker.com/desktop/?_gl=1*hma6xv*_ga*MTM4MDU4NjgxMC4xNzA1Njc4MjM3*_ga_XJWPQMJYHQ*MTcwNTgyMDI5OC43LjEuMTcwNTgyMDMxNS40My4wLjA.) installed and daemon is running in the background.
- Run the following the command on your terminal while building the image for the first time and whenever you make any changes in the codebase (rebuild would be required in that case).

```
docker compose up --build
```

- For all the subsequent running of servers, just remove `--build` tag from the previous command. Now, both the containers (one containing the redis-server and other one with url-shortening-service) start running and we can test the APIs locally.

## References-

1. https://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/
2. https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
3. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
4. https://www.mongodb.com/docs/manual/tutorial/expire-data/#expire-documents-at-a-specific-clock-time
5. https://www.youtube.com/watch?v=bP4BeUjNkXc
6. https://redis.io/docs/connect/clients/om-clients/stack-node/
