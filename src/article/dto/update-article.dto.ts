// src/article/dto/update-article.dto.ts

import { IsString, IsOptional, IsBoolean } from 'class-validator';
// /// START
import { ApiPropertyOptional } from '@nestjs/swagger'; // 👈 updated
// /// END

export class UpdateArticleDto {
  // /// START
  @ApiPropertyOptional({ example: 'Обновлённый заголовок', description: 'Название статьи' }) // 👈 updated
  @IsString()
  @IsOptional()
  readonly title?: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ example: 'Обновлённое содержимое', description: 'Содержимое статьи' }) // 👈 updated
  @IsString()
  @IsOptional()
  readonly content?: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ example: true, description: 'Опубликована ли статья' }) // 👈 updated
  @IsBoolean()
  @IsOptional()
  readonly published?: boolean;
  // /// END
}
