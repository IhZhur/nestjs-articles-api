import { DataSource } from 'typeorm';
import { Article } from './src/article/article.entity';
import { User } from './src/user/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: (process.env.DB_TYPE as any) || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nestjs_articles_db',
  entities: [User, Article],
  migrations: ['migrations/*.ts'],
  synchronize: false,
  logging: true,
});
