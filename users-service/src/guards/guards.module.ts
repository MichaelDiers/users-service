import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ApiKeyGrpcGuard } from './api-key-grpc.guard';
import { ApiKeyHttpGuard } from './api-key-http.guard';
import { ApiKeyTcpGuard } from './api-key-tcp.guard';

@Module({
  exports: [ApiKeyGrpcGuard, ApiKeyHttpGuard, ApiKeyTcpGuard],
  imports: [ConfigurationModule],
  providers: [ApiKeyGrpcGuard, ApiKeyHttpGuard, ApiKeyTcpGuard],
})
export class GuardsModule {}
