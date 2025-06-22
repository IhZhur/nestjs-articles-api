// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // 👈

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальная валидация
  app.useGlobalPipes(new ValidationPipe());

  // Swagger конфигурация
  const config = new DocumentBuilder()
    .setTitle('Articles API')
    .setDescription('Учебный CRUD API для сущности Article')
    .setVersion('1.0')
    .addBearerAuth() // 👈 Добавим JWT поддержку
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👉 http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
