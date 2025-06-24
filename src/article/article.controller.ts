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
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.entity';

// /// START: Swagger imports
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
// /// END

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // /// START создание статьи (только авторизованные)
  @ApiOperation({ summary: 'Создать статью' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Статья создана' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }
  // /// END

  // /// START получение всех статей с фильтрами и сортировкой
  @ApiOperation({ summary: 'Получить список статей с фильтрами и сортировкой' })
  @ApiResponse({ status: 200, description: 'Массив статей' })
  @ApiQuery({ name: 'search', required: false, description: 'Поиск по title/content' })
  @ApiQuery({ name: 'sort', required: false, description: 'Поле сортировки: createdAt, title, published' })
  @ApiQuery({ name: 'order', required: false, description: 'Порядок сортировки: asc/desc' })
  @Get()
  findAll(@Query() query: QueryArticleDto) {
    return this.articleService.findAll(query);
  }
  // /// END

  // /// START получение одной статьи по id (открытый)
  @ApiOperation({ summary: 'Получить статью по id' })
  @ApiResponse({ status: 200, description: 'Одна статья' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(id);
  }
  // /// END

  // /// START обновление статьи (только авторизованные)
  @ApiOperation({ summary: 'Обновить статью' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }
  // /// END

  // /// START удаление статьи (только admin)
  @ApiOperation({ summary: 'Удалить статью (только admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.remove(id);
  }
  // /// END
}
