// src/article/dto/create-article.dto.ts

import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'Заголовок статьи', description: 'Название статьи' })
  @IsString()
  readonly title: string;

  @ApiPropertyOptional({ example: 'Текст статьи', description: 'Содержимое' })
  @IsString()
  @IsOptional()
  readonly content?: string;

  @ApiPropertyOptional({ example: true, description: 'Опубликовано' })
  @IsBoolean()
  @IsOptional()
  readonly published?: boolean;
}
