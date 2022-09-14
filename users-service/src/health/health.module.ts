import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthChecksModule } from '../health-checks/health-checks.module';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    HealthChecksModule,
    ConfigurationModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
