import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { ISecretManagerService } from './secret-manager.interface';
import { ILoggingService, LOGGING_SERVICE } from './logging.interface';
import { EnvNames } from 'src/env-names';

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
   * @param configService Access the configuration of the application.
   */
  constructor(
    @Inject(LOGGING_SERVICE) private readonly loggingService: ILoggingService,
    private configService: ConfigService,
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
    if (this.configService.get(EnvNames.SECRETS_FROM_ENV)) {
      return this.configService.get(secretName);
    }

    // use google cloud secret manager
    if (!this.client) {
      this.client = new SecretManagerServiceClient();
    }

    const name = `projects/${this.configService.get(EnvNames.PROJECT_NAME)}/secrets/${secretName}/versions/latest`;
    try {
      const [version] = await this.client.accessSecretVersion({ name });
      return version.payload.data.toString();
    } catch (err) {
      this.loggingService.logError(err.message, err.stack);
      return;
    }
  }
}
