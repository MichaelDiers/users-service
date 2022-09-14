import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (validation)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('validation should fail for invalid guid', () => {
    it('/users (GET)', () => {
      return request(app.getHttpServer()).get('/users/foobar').expect(400);
    });

    it('/users (PATCH)', () => {
      return request(app.getHttpServer()).patch('/users/foobar').expect(400);
    });

    it('/users (DELETE)', () => {
      return request(app.getHttpServer()).delete('/users/foobar').expect(400);
    });
  });
});
