// src/article/dto/query-article.dto.ts

import { IsOptional, IsString, IsIn } from 'class-validator';
// /// START
import { ApiPropertyOptional } from '@nestjs/swagger'; // 👈 updated
// /// END

export class QueryArticleDto {
  // /// START
  @ApiPropertyOptional({ example: 'keyword', description: 'Поиск по названию или содержимому' }) // 👈 updated
  @IsOptional()
  @IsString()
  search?: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ example: 'createdAt', description: 'Поле сортировки' }) // 👈 updated
  @IsOptional()
  @IsString()
  sort?: string; // по какому полю сортировать
  // /// END

  // /// START
  @ApiPropertyOptional({ example: 'desc', enum: ['asc', 'desc'], description: 'Порядок сортировки' }) // 👈 updated
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
  // /// END
}
