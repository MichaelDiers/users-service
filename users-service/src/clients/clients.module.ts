import { Module } from '@nestjs/common';
import { GrpcUsersClient } from './grpc-users-client';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigurationModule } from '../configuration/configuration.module';
import { InjectionNames } from '../configuration/InjectionNames.enum';
import { TcpUsersClient } from './tcp-users-client';

@Module({
  exports: [
    InjectionNames.GRPC_USERS_CLIENT,
    InjectionNames.TCP_USERS_CLIENT,
    InjectionNames.CLIENT_GRPC_PROXY,
    InjectionNames.CLIENT_TCP_PROXY,
  ],
  imports: [ConfigurationModule],
  providers: [
    {
      provide: InjectionNames.CLIENT_GRPC_PROXY,
      useFactory: (grpcConfig: any) => ClientProxyFactory.create(grpcConfig),
      inject: [InjectionNames.GRPC_CONFIG],
    },
    {
      provide: InjectionNames.CLIENT_TCP_PROXY,
      useFactory: (tcpConfig: any) => {
        return ClientProxyFactory.create(tcpConfig);
      },
      inject: [InjectionNames.TCP_CONFIG],
    },
    {
      provide: InjectionNames.GRPC_USERS_CLIENT,
      useClass: GrpcUsersClient,
    },
    {
      provide: InjectionNames.TCP_USERS_CLIENT,
      useClass: TcpUsersClient,
    },
  ],
})
export class ClientsModule {}
