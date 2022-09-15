# users-service
A [NestJs](https://nestjs.com/) hybrid app for creating, reading, updating and deleting users.

## Feature list
- Apis
  - REST Api
  - microservice using GRPC
  - microservice using TCP
- database
  - MongoDB Atlas Cloud Database for production
  - MongoDB docker container for local development
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
