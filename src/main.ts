// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)), // 👈 добавили!
    new LoggingInterceptor()
  );

  // /// START swagger config
  const config = new DocumentBuilder()
    .setTitle('NestJS Articles API')
    .setDescription('API для статей с RBAC, фильтрами, аутентификацией')
    .setVersion('1.0')
    .addBearerAuth() // Для авторизации через JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // /// END

  await app.listen(3000);
}
bootstrap();
