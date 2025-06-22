// src/data-source.ts
import * as dotenv from 'dotenv';
dotenv.config(); // 👈 Загружаем переменные из .env

import { DataSource } from 'typeorm';
import { Article } from './article/article.entity'; // 👈 относительный путь внутри src/

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Article],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
