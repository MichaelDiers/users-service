import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ClientsModule } from './clients.module';
import { GrpcUsersClient } from './grpc-users-client';

describe('GrpcUsersClient', () => {
  let provider: GrpcUsersClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrpcUsersClient],
      imports: [ConfigurationModule, ClientsModule],
    }).compile();

    provider = module.get<GrpcUsersClient>(GrpcUsersClient);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
