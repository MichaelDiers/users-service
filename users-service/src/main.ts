import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ApiKeyHttpGuard } from './guards/api-key-http.guard';
import { HashPipe } from './pipes/hash-pipe';
import { InjectionNames } from './configuration/InjectionNames.enum';

/**
 * The application setup.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(app.get(InjectionNames.GRPC_CONFIG));
  app.connectMicroservice(app.get(InjectionNames.TCP_CONFIG));
  await app.startAllMicroservices();

  app.useGlobalGuards(app.get(ApiKeyHttpGuard));
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true, // remove all unknown fields
    }),
    app.get(HashPipe),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (app.get(InjectionNames.USE_SWAGGER)) {
    const document = SwaggerModule.createDocument(
      app,
      app.get(InjectionNames.SWAGGER_CONFIG),
    );
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(app.get(InjectionNames.USERS_REST_PORT));
}

bootstrap();
