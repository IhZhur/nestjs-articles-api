// src/article/article.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './article.entity';

@Controller('articles') // 👈 Базовый путь: /articles
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // POST /articles
  @Post()
  create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(dto);
  }

  // GET /articles
  @Get()
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  // GET /articles/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.findOne(id);
  }

  // PUT /articles/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.update(id, dto);
  }

  // DELETE /articles/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.articleService.remove(id);
  }
}
