// src/article/dto/get-articles-query.dto.ts

import { IsOptional, IsBooleanString, IsNumberString } from 'class-validator';
// /// START
import { ApiPropertyOptional } from '@nestjs/swagger'; // 👈 updated
// /// END

export class GetArticlesQueryDto {
  // /// START
  @ApiPropertyOptional({ example: '1', description: 'Номер страницы (пагинация)' }) // 👈 updated
  @IsOptional()
  @IsNumberString()
  page?: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ example: '10', description: 'Размер страницы (лимит)' }) // 👈 updated
  @IsOptional()
  @IsNumberString()
  limit?: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ example: 'true', description: 'Фильтр по публикации' }) // 👈 updated
  @IsOptional()
  @IsBooleanString()
  published?: string;
  // /// END
}
