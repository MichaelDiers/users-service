import { Inject, Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { ISecretManagerService } from './secret-manager.interface';
import { ILoggingService, LOGGING_SERVICE } from './logging.interface';

/**
 * The names of secrets.
 */
const enum SecretNames {
  CONNECTION_STRING = 'UsersServiceConnectionString',
}

/**
 * Access for the google cloud secret manager.
 */
@Injectable()
export class SecretManagerService implements ISecretManagerService {
  /**
   * Creates a new SecretManagerService instance.
   * @param loggingService An error logger.
   */
  constructor(
    @Inject(LOGGING_SERVICE) private readonly loggingService: ILoggingService,
  ) { }

  /**
   * The client for accessing the google secret manager.
   */
  private client: SecretManagerServiceClient;

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
    // use .env instead of google cloud secret manager
    if (process.env.SECRETS_FROM_ENV) {
      return process.env[secretName];
    }

    // use google cloud secret manager
    if (!this.client) {
      this.client = new SecretManagerServiceClient();
    }

    const name = `projects/${process.env.MH_PROJECT_NAME}/secrets/${secretName}/versions/latest`;
    try {
      const [version] = await this.client.accessSecretVersion({ name });
      return version.payload.data.toString();
    } catch (err) {
      this.loggingService.logError(err.message, err.stack);
      return;
    }
  }
}
