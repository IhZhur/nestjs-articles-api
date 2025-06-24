// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // /// START swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

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
