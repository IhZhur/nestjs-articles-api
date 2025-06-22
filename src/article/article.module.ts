// src/article/article.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service'; // 👈
import { ArticleController } from './article.controller'; // 👈 пока заглушка

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleService],
  controllers: [ArticleController], // 👈 добавим позже
})
export class ArticleModule {}
