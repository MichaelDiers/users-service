/**
 * Names of environment variables.
 */
export enum EnvNames {
  /**
   * Defines the number rounds for hashing data.
   */
  HASH_ROUNDS = 'USERS_HASH_ROUNDS',

  /**
   * The name of the project.
   */
  PROJECT_NAME = 'USERS_PROJECT_NAME',

  /**
   * Specifies if secret data is read from .env or from google cloud secret manager.
   */
  SECRETS_FROM_ENV = 'USERS_SECRETS_FROM_ENV',

  /**
   * The expected api key for incoming requests.
   */
  API_KEY = 'USERS_API_KEY',

  /**
   * Specifies if swagger is active.
   */
  USE_SWAGGER = 'USERS_USE_SWAGGER',

  /**
   * The port for the grpc service.
   */
  GRPC_PORT = 'USERS_GRPC_PORT',

  /**
   * The port for the tcp service.
   */
  TCP_PORT = 'USERS_TCP_PORT',
}
