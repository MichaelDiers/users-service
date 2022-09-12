import { Module } from '@nestjs/common';
import { LOGGING_SERVICE } from './logging.interface';
import LoggingService from './logging.service';
import { SECRET_MANAGER_SERVICE } from './secret-manager.interface';
import { SecretManagerService } from './secret-manager.service';

@Module({
  exports: [
    LOGGING_SERVICE,
    SECRET_MANAGER_SERVICE,
  ],
  providers: [
    {
      provide: LOGGING_SERVICE,
      useClass: LoggingService,
    },
    {
      provide: SECRET_MANAGER_SERVICE,
      useClass: SecretManagerService,
    }
  ],
})
export class ServicesModule { }
