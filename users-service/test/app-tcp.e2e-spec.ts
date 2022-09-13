import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import {
  ClientProxy,
  ClientsModule,
  MicroserviceOptions,
} from '@nestjs/microservices';
import { tcpConfig } from '../src/configs';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import * as uuid from 'uuid';
import { firstValueFrom } from 'rxjs';
import UserListDto from '../src/users/dto/user-list.dto';
import { User } from '../src/users/database/user.schema';
import ApiKeyDto from '../src/users/dto/api-key.dto';
import { ConfigService } from '@nestjs/config';
import { EnvNames } from '../src/env-names';
import { Constants } from '../src/validation/constants';

describe('TCP tests', () => {
  let app: INestApplication;
  let client: ClientProxy;
  let configService: ConfigService;

  beforeEach(async () => {
    const config = tcpConfig() as any;
    config.name = 'CLIENT';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ClientsModule.register([config])],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>(tcpConfig());
    await app.startAllMicroservices();
    await app.init();
    client = app.get('CLIENT');
    await client.connect();
    configService = app.get(ConfigService);
  });

  afterEach(async () => {
    client.close();
    await app.close();
  });

  describe('create', () => {
    it('create should succeed', async () => {
      const data: CreateUserDto & ApiKeyDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
        apiKey: configService.get(EnvNames.API_KEY),
      };
      const { displayName, guid } = await firstValueFrom(
        await client.send({ cmd: 'create' }, data),
      );
      expect(displayName).toBe(data.displayName);
      expect(
        uuid.validate(guid) &&
          uuid.version(guid) === Number(Constants.UUID_VERSION),
      ).toBe(true);
    });
  });

  describe('readAll', () => {
    it('readAll should list all users', async () => {
      const data: CreateUserDto & ApiKeyDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
        apiKey: configService.get(EnvNames.API_KEY),
      };

      const { guid } = await firstValueFrom(
        await client.send({ cmd: 'create' }, data),
      );

      const result = await firstValueFrom<UserListDto>(
        await client.send(
          { cmd: 'findAll' },
          { apiKey: configService.get(EnvNames.API_KEY) },
        ),
      );
      expect(result.users.length).toBeGreaterThan(0);
      expect(
        result.users.findIndex((user) => user.guid === guid),
      ).toBeGreaterThan(-1);
    });
  });

  describe('read', () => {
    it('read should return the new user', async () => {
      const data: CreateUserDto & ApiKeyDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
        apiKey: configService.get(EnvNames.API_KEY),
      };

      const { guid } = await firstValueFrom(
        await client.send({ cmd: 'create' }, data),
      );

      const result = await firstValueFrom<User>(
        await client.send(
          { cmd: 'findOne' },
          { guid, apiKey: configService.get(EnvNames.API_KEY) },
        ),
      );
      expect(result.displayName).toBe(data.displayName);
      expect(result.guid).toBe(guid);
    });
  });

  describe('update', () => {
    it('update should succeed', async () => {
      const data: CreateUserDto & ApiKeyDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
        apiKey: configService.get(EnvNames.API_KEY),
      };

      const { guid } = await firstValueFrom(
        await client.send({ cmd: 'create' }, data),
      );

      const newDisplayName = uuid.v4();
      const empty = await client.send(
        { cmd: 'update' },
        {
          guid,
          displayName: newDisplayName,
          apiKey: configService.get(EnvNames.API_KEY),
        },
      );
      await firstValueFrom(empty, { defaultValue: true });

      const result = await firstValueFrom<User>(
        await client.send(
          { cmd: 'findOne' },
          { guid, apiKey: configService.get(EnvNames.API_KEY) },
        ),
      );
      expect(result.displayName).toBe(newDisplayName);
      expect(result.guid).toBe(guid);
    });
  });

  describe('delete', () => {
    it('delete should remove the new user', async () => {
      const data: CreateUserDto & ApiKeyDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
        apiKey: configService.get(EnvNames.API_KEY),
      };

      const { guid } = await firstValueFrom(
        await client.send({ cmd: 'create' }, data),
      );

      await firstValueFrom(
        await client.send(
          { cmd: 'remove' },
          { guid, apiKey: configService.get(EnvNames.API_KEY) },
        ),
        {
          defaultValue: true,
        },
      );
      try {
        await firstValueFrom(
          await client.send(
            { cmd: 'findOne' },
            { guid, apiKey: configService.get(EnvNames.API_KEY) },
          ),
        );
        throw new Error('expected an error');
      } catch (err) {
        expect(err.status).toBe(404);
      }
    });
  });
});
