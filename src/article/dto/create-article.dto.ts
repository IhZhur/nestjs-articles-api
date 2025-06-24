// src/article/dto/create-article.dto.ts

import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsBoolean()
  @IsOptional()
  readonly published?: boolean;

  @IsInt()
  @IsOptional()
  readonly userId?: number; // 👈 для связи с пользователем
}
