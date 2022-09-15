import { Inject, Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { ILoggingService, LOGGING_SERVICE } from '../logging/logging.interface';
import { InjectionNames } from './InjectionNames.enum';

/**
 * The names of secrets.
 */
const enum SecretNames {
  API_KEY = 'UsersServiceApiKey',
  CONNECTION_STRING = 'UsersServiceConnectionString',
}

/**
 * Access for the google cloud secret manager.
 */
@Injectable()
export class SecretManagerService {
  /**
   * Creates a new SecretManagerService instance.
   * @param loggingService An error logger.
   */
  constructor(
    @Inject(LOGGING_SERVICE) private readonly loggingService: ILoggingService,
    @Inject(InjectionNames.PROJECT_NAME) private readonly projectName: string,
  ) {}

  /**
   * The client for accessing the google secret manager.
   */
  private client: SecretManagerServiceClient;

  /**
   * Gets the api key for the users service.
   * @returns The api key.
   */
  async getApiKey(): Promise<string | undefined> {
    return this.getSecretAsync(SecretNames.API_KEY);
  }

  /**
   * Gets the mongodb connection string.
   * @returns The mongodb connection string if the secret exists and undefined otherwise.
   */
  async getConnectionString(): Promise<string | undefined> {
    return this.getSecretAsync(SecretNames.CONNECTION_STRING);
  }

  /**
   * Access the latest version of a secret.
   * @param secretName The name of the secret.
   * @returns The value of the latest version of the secret if the secret exists and undefined otherwise.
   */
  private async getSecretAsync(
    secretName: string,
  ): Promise<string | undefined> {
    if (!this.client) {
      this.client = new SecretManagerServiceClient();
    }

    const name = `projects/${this.projectName}/secrets/${secretName}/versions/latest`;
    try {
      const [version] = await this.client.accessSecretVersion({ name });
      return version.payload.data.toString();
    } catch (err) {
      this.loggingService.logError(err.message, err.stack);
      return;
    }
  }
}
