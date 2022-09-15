# users-service
A [NestJs](https://nestjs.com/) hybrid app for creating, reading, updating and deleting users.

## Feature list
- Apis
  - REST Api
  - microservice using GRPC
  - microservice using TCP
- database
  - [MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas) Database for production
  - [MongoDB docker image](https://hub.docker.com/_/mongo) for local development
- Deployment via [GitHub workflow](https://github.com/MichaelDiers/users-service/blob/main/.github/workflows/users-service.yaml)
  - The service is hosted on [Google Cloud Run](https://cloud.google.com/run) in a [Docker container](https://www.docker.com/resources/what-container/)
- additional [Swagger](https://swagger.io/) endpoint for accessing the rest api: [Production Link](https://users-service-prdsggicqa-uc.a.run.app/api)
- [NestJs features](https://nestjs.com/)
  - [guards](https://docs.nestjs.com/guards) for validating api keys
  - [interceptors](https://docs.nestjs.com/interceptors): The REST Api and microservices share the same business logic and therefore http exceptions have to be transformed into rpc exceptions for microservices.
  - [pipes](https://docs.nestjs.com/pipes) are used for hashing emails and passwords.
  - [validation](https://docs.nestjs.com/techniques/validation) of DTOs. 
- health checks for services, database and documentation
- Tests using [Jest](https://jestjs.io)
  - unit tests
  - end-to-end tests

## Documentation

The [documentation](https://michaeldiers.github.io/users-service/index.html) is generated using [compodoc](https://compodoc.app/).
