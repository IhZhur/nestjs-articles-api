// src/article/article.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.entity';
import { Article } from './article.entity';
import { OwnerOrAdminGuard } from '../auth/guards/owner-or-admin.guard'; // 👈
import { OwnerCheck } from '../auth/decorators/owner-check.decorator';  // 👈

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: 'Создать статью' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Статья создана', type: Article })
  @ApiBody({ type: CreateArticleDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req
  ) {
    return this.articleService.create(createArticleDto, req.user.userId);
  }

  @ApiOperation({ summary: 'Получить список статей с фильтрами и сортировкой' })
  @ApiResponse({ status: 200, description: 'Массив статей', type: [Article] })
  @ApiQuery({ name: 'search', required: false, description: 'Поиск по title/content' })
  @ApiQuery({ name: 'sort', required: false, description: 'Поле сортировки: createdAt, title, published' })
  @ApiQuery({ name: 'order', required: false, description: 'Порядок сортировки: asc/desc' })
  @Get()
  findAll(@Query() query: QueryArticleDto) {
    return this.articleService.findAll(query);
  }

  @ApiOperation({ summary: 'Получить статью по id' })
  @ApiResponse({ status: 200, description: 'Одна статья', type: Article })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(id);
  }

  // --- Только автор или admin ---
  @ApiOperation({ summary: 'Обновить статью' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Обновлённая статья', type: Article })
  @ApiBody({ type: UpdateArticleDto })
  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  @OwnerCheck({
    service: ArticleService,
    findMethod: 'findOne',
    ownerField: 'user.id',
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  // --- Только автор или admin ---
  @ApiOperation({ summary: 'Удалить статью' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Статья удалена' })
  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  @OwnerCheck({
    service: ArticleService,
    findMethod: 'findOne',
    ownerField: 'user.id',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.remove(id);
  }
}
