import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticlesQueryDto } from './dto/get-articles-query.dto';
import { Article } from './article.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// /// START: Swagger-декораторы /// 👈 updated
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
// /// END

@ApiTags('articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiResponse({ status: 201, description: 'Создать статью.' })
  @ApiBody({ type: CreateArticleDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(dto);
  }

  @ApiResponse({ status: 200, description: 'Получить список статей.' })
  @Get()
  findAll(@Query() query: GetArticlesQueryDto): Promise<Article[]> {
    const parsedQuery = {
      page: query.page ? parseInt(query.page, 10) : 1,
      limit: query.limit ? parseInt(query.limit, 10) : 10,
      published:
        query.published !== undefined ? query.published === 'true' : undefined,
    };

    return this.articleService.findAll(parsedQuery);
  }

  @ApiResponse({ status: 200, description: 'Получить одну статью.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Обновить статью.' })
  @ApiBody({ type: UpdateArticleDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.update(id, dto);
  }

  @ApiResponse({ status: 200, description: 'Удалить статью.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.articleService.remove(id);
  }
}
