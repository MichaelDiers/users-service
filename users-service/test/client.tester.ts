import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import * as uuid from 'uuid';
import { Constants } from '../src/users/constants';
import IUsersClient from '../src/users/interfaces/users-client.interface';
import { InjectionNames } from '../src/configuration/InjectionNames.enum';

/**
 * A generic test for different clients and services: GRPC, TCP
 * @param clientInjectionName The injection name for the client.
 * @param microserviceConfigName The injection name for client configuration.
 */
export default function clientTest(
  clientInjectionName: string,
  microserviceConfigName: string,
) {
  describe('client tests', () => {
    let app: INestApplication;
    let client: IUsersClient;

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      app.connectMicroservice(app.get(microserviceConfigName));
      await app.startAllMicroservices();
      await app.init();
      client = app.get(clientInjectionName);
    });

    afterEach(async () => {
      await app.close();
      await client.close();
    });

    describe('create', () => {
      it('create should succeed', async () => {
        const data: CreateUserDto = {
          displayName: uuid.v4(),
          email: `${uuid.v4()}@example.com`,
          password: uuid.v4(),
        };

        const response = await client.create(data);
        expect(response.displayName).toBe(data.displayName);
        expect(
          uuid.validate(response.guid) &&
            uuid.version(response.guid) === Number(Constants.UUID_VERSION),
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

        const createdUser = await client.create(data);
        const users = await client.findAll();

        expect(
          users.findIndex((user) => user.guid === createdUser.guid),
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

        const createdUser = await client.create(data);
        const user = await client.findOne(createdUser.guid);
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

        const { guid } = await client.create(data);

        const newDisplayName = uuid.v4();
        await client.update(guid, { displayName: newDisplayName });

        const user = await client.findOne(guid);
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

        const { guid } = await client.create(data);
        await client.remove(guid);
        try {
          await client.findOne(guid);
          throw new Error('expected an exception');
        } catch (err) {
          if (clientInjectionName === InjectionNames.GRPC_USERS_CLIENT) {
            expect(err.code).toBe(2);
            expect(err.details).toBe('Not Found');
          } else if (clientInjectionName === InjectionNames.TCP_USERS_CLIENT) {
            expect(err.status).toBe(404);
          } else {
            throw new Error('handler missing');
          }
        }
      });
    });

    describe('health check', () => {
      it('health check should succeed', async () => {
        await client.healthCheck();
      });
    });
  });
}
