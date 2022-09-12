import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './guards/api-key.guard';
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
  await app.listen(3000);
}

bootstrap();
