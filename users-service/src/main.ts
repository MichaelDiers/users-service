import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './guards/api-key.guard';
import { HeaderNames } from './header-names';
import { HashPipe } from './pipes/hash-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, 'proto/users.proto'),
      url: 'localhost:3010',
    },
  });
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);

  app.useGlobalGuards(new ApiKeyGuard(configService));
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true, // remove all unknown fields
    }),
    new HashPipe(configService),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('UsersService')
    .setDescription('The api of the users service.')
    .setVersion('1.0')
    .addTag('users')
    .addApiKey(
      { type: 'apiKey', name: HeaderNames.X_API_KEY, in: 'header' },
      HeaderNames.X_API_KEY,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
