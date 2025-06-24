// src/article/dto/update-article.dto.ts

import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsBoolean()
  @IsOptional()
  readonly published?: boolean;
}
