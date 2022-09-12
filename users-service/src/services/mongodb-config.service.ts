import { Inject, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import {
  ISecretManagerService,
  SECRET_MANAGER_SERVICE,
} from './secret-manager.interface';

/**
 * A MongooseOptionsFactory for creating the options for connecting to mongodb.
 */
@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  /**
   * Create a new instance of MongodbConfigService.
   * @param secretManagerService Access google clouds secret manager.
   */
  constructor(
    @Inject(SECRET_MANAGER_SERVICE)
    private readonly secretManagerService: ISecretManagerService,
  ) { }

  /**
   * Create the options for connecting to mongodb.
   * @returns A Promise<T> whose result are the MongooseModuleOptions.
   */
  public createMongooseOptions(): Promise<MongooseModuleOptions> {
    return new Promise((resolve, reject) => {
      this.secretManagerService
        .getConnectionString()
        .then((connectionString: string) => {
          const options = {
            uri: connectionString,
          };

          resolve(options);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
