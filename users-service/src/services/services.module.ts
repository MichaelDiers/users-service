import { Module } from '@nestjs/common';
import { LOGGING_SERVICE } from './logging.interface';
import LoggingService from './logging.service';
import { MongodbConfigService } from './mongodb-config.service';
import { SECRET_MANAGER_SERVICE } from './secret-manager.interface';
import { SecretManagerService } from './secret-manager.service';

@Module({
  exports: [LOGGING_SERVICE, SECRET_MANAGER_SERVICE, MongodbConfigService],
  providers: [
    {
      provide: LOGGING_SERVICE,
      useClass: LoggingService,
    },
    {
      provide: SECRET_MANAGER_SERVICE,
      useClass: SecretManagerService,
    },
    MongodbConfigService,
  ],
})
export class ServicesModule {}
