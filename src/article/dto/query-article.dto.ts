// src/article/dto/query-article.dto.ts

import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryArticleDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string; // по какому полю сортировать

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
