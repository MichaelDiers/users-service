import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { UsersGrpcHealthCheck } from './users-grpc-health-check';

@Module({
  exports: [UsersGrpcHealthCheck],
  imports: [ClientsModule],
  providers: [UsersGrpcHealthCheck],
})
export class HealthChecksModule {}
