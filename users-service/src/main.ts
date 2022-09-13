import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvNames } from './env-names';
import { ApiKeyHttpGuard } from './guards/api-key-http.guard';
import { HeaderNames } from './header-names';
import { HashPipe } from './pipes/hash-pipe';
import * as configs from './configs/index';

/**
 * The application setup.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice(configs.grpcConfig(configService));
  app.connectMicroservice(configs.tcpConfig(configService));

  await app.startAllMicroservices();

  app.useGlobalGuards(new ApiKeyHttpGuard(configService));
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true, // remove all unknown fields
    }),
    new HashPipe(configService),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (configService.get(EnvNames.USE_SWAGGER)) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('UsersService')
      .setDescription('The api of the users service.')
      .setVersion('1.0')
      .addTag('users')
      .addApiKey(
        { type: 'apiKey', name: HeaderNames.X_API_KEY, in: 'header' },
        HeaderNames.X_API_KEY,
      )
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}

bootstrap();
