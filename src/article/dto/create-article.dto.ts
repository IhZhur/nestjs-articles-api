// src/article/dto/create-article.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
