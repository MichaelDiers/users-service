import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ClientsModule } from './clients.module';
import { TcpUsersClient } from './tcp-users-client';

describe('TcpUsersClient', () => {
  let provider: TcpUsersClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TcpUsersClient],
      imports: [ConfigurationModule, ClientsModule],
    }).compile();

    provider = module.get<TcpUsersClient>(TcpUsersClient);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
