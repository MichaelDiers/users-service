import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ClientGrpc, ClientsModule } from '@nestjs/microservices';
import * as configs from '../src/configs';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import * as uuid from 'uuid';
import { IGrpcUsersService } from '../src/users/interfaces/users-grpc-controller.interface';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { HeaderNames } from '../src/header-names';
import { ConfigService } from '@nestjs/config';
import { EnvNames } from '../src/env-names';
import UserListDto from 'src/users/dto/user-list.dto';
import { User } from 'src/users/entities/user.entity';
import { Constants } from 'src/validation/constants';

describe('GRPC tests', () => {
  let app: INestApplication;
  let client: ClientGrpc;
  let metadata: Metadata;

  beforeEach(async () => {
    const config = configs.grpcConfig() as any;
    config.name = 'CLIENT';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ClientsModule.register([config])],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice(configs.grpcConfig());
    await app.startAllMicroservices();
    await app.init();
    client = app.get('CLIENT');

    metadata = new Metadata();
    metadata.add(
      HeaderNames.X_API_KEY,
      app.get(ConfigService).get(EnvNames.API_KEY),
    );
  });

  afterEach(async () => {
    await app.close();
  });

  describe('create', () => {
    it('create should succeed', async () => {
      const data: CreateUserDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
      };

      const service = client.getService<IGrpcUsersService>('GrpcUsersService');

      const result = await firstValueFrom(await service.create(data, metadata));
      expect(result.displayName).toBe(data.displayName);
      expect(
        uuid.validate(result.guid) &&
          uuid.version(result.guid) === Constants.UUID_VERSION,
      ).toBe(true);
    });
  });

  describe('findAll', () => {
    it('findAll should list the new user', async () => {
      const data: CreateUserDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
      };

      const service = client.getService<IGrpcUsersService>('GrpcUsersService');

      const createdUser = await firstValueFrom<User>(
        await service.create(data, metadata),
      );

      const allUsers = await firstValueFrom<UserListDto>(
        await service.findAll({}, metadata),
      );
      expect(
        allUsers.users.findIndex((user) => user.guid === createdUser.guid),
      ).toBeGreaterThan(-1);
    });
  });

  describe('findOne', () => {
    it('findOne should read the new user', async () => {
      const data: CreateUserDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
      };

      const service = client.getService<IGrpcUsersService>('GrpcUsersService');

      const createdUser = await firstValueFrom<User>(
        await service.create(data, metadata),
      );

      const user = await firstValueFrom<User>(
        await service.findOne({ guid: createdUser.guid }, metadata),
      );
      expect(user.guid).toBe(createdUser.guid);
    });
  });

  describe('update', () => {
    it('update should set a new displayName', async () => {
      const data: CreateUserDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
      };

      const service = client.getService<IGrpcUsersService>('GrpcUsersService');

      const { guid } = await firstValueFrom<User>(
        await service.create(data, metadata),
      );

      const newDisplayName = uuid.v4();
      await firstValueFrom(
        await service.update({ guid, displayName: newDisplayName }, metadata),
      );

      const user = await firstValueFrom<User>(
        await service.findOne({ guid }, metadata),
      );
      expect(user.guid).toBe(guid);
      expect(user.displayName).toBe(newDisplayName);
    });
  });

  describe('remove', () => {
    it('remove should delete the new user', async () => {
      const data: CreateUserDto = {
        displayName: uuid.v4(),
        email: `${uuid.v4()}@example.com`,
        password: uuid.v4(),
      };

      const service = client.getService<IGrpcUsersService>('GrpcUsersService');

      const { guid } = await firstValueFrom<User>(
        await service.create(data, metadata),
      );
      await firstValueFrom(await service.remove({ guid }, metadata));

      try {
        await firstValueFrom<User>(await service.findOne({ guid }, metadata));
        throw new Error('expected an exception');
      } catch (err) {
        expect(err.code).toBe(2);
        expect(err.details).toBe('Not Found');
      }
    });
  });
});
