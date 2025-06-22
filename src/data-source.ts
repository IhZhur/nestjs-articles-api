// src/data-source.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { Article } from './article/article.entity';
import { User } from './user/user.entity'; // 👈 Добавить

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Article, User], // 👈 Добавить User
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
