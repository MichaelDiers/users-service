import { Module } from '@nestjs/common';
import { LOGGING_SERVICE } from './logging.interface';
import LoggingService from './logging.service';

@Module({
  exports: [LOGGING_SERVICE],
  providers: [
    {
      provide: LOGGING_SERVICE,
      useClass: LoggingService,
    },
  ],
})
export class LoggingModule {}
