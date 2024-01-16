# URL-Shortening-Microservice

## General Overview:

This is a sophisticated URL shortening service that not only shortens URLs but also provides detailed analytics. This service caters to high traffic, ensuring performance and scalability. Tech stack used for building the service is Node.js and Express.js, along with Typescript. The Databse used here in MongoDB.

## Architecture:

We are following a MVC (Model-View-COntroller) architecture here. The modular structure of the repository is as follows:

- config: This module contains all the configuration files such as dbConnector; which return an object establishing connection with the Databse.
- controller: This module contains all the relevant API business logic. We process the request objects, make queries to the DB, process the queried data and send response as per our needs in the handler functions. - middleware: This module contains all the middleware (request/response interceptors) to be used in our API. - model: This module contains all the model schemas directing the way data is stored in documents. All the CRUD operations takes place here itself. - route: This module defines all the paths to respective API endpoints.
- utils: This module contains all the common utility functions to be used in out project.

## User Authentication:

We have two endpoints for registering a new user and signing in the existing user respectively.

- Registration: A new user could signup by passing 'username' and 'password' keys in the request body.
- Signin: An existing user can signin using username and password, in the request body again. This endpoint also returns an access token to manage sessions in the Frontend.

## Security:

- To ensure security of our APIs and prevent unautorized access, we have a middleware to enable JWT authentication. The access token in the session must be passed as a Bearer Token in the header. Now this token is validated against the secret key given and also userId in the decoded token's payload is matched with the user's userId to ensure only that particular user has access to their URLs and Analytics.
- Also, passwords are encrypted using CryptoJS and stored in the form of hash in the DB.

## URL Shortening Algoritm:

We are using hash where each long URL (key) will be mapped to a 6-digit unique integer(value) and base-64 string equivalent of that integer will be the short URL. To handle expirations and auto-deletion of these short URLs along with the associated analytics, we are using MongoDB TTL indexing. We are mapping each shortURL (stored in 'urls' collection) to the userId which is the unique ObjectId of the corresponding user in 'users' collection.

## Associated Analytics:

- For each short URL, we have an array of objects 'clicks', where each objects contains the timstamp recorded during click and geographical location in the form of longitude and latitude.
- We have an API which provides us time-based analytics in the form of most active hours.

## Steps to host the server locally:

- Clone the project from Github repository to your local machine.
- Run the following commands on your terminal to initialize npm and install all the relevant packages.

```
npm init
```

```
npm install
```

- Ask the author to share .env file to be used for the project.
- Use the following command and server will be up and running on PORT 8000 of your machine.

```
npm start
```

- Use Postman to test the APIs. You may ask the author for curl scripts of respective endpoints for convenience.

## References-

1. https://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/
2. https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
3. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
4. https://www.mongodb.com/docs/manual/tutorial/expire-data/#expire-documents-at-a-specific-clock-time
