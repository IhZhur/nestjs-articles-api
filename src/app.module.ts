// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module'; // 👈 Article module

import { AuthModule } from './auth/auth.module'; 
@Module({
  imports: [
    // Загрузка переменных из .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Подключение к MySQL через TypeORM
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false, // 👈 отключено
  }),

    // Подключение модуля статьи
    ArticleModule, // 👈 updated
    AuthModule, // 👈 добавляем сюда
  ],
})
export class AppModule {}
