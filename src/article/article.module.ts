// src/article/article.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User])], // 👈 User нужен для связи
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
