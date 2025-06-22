import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // 👈

export class CreateArticleDto {
  @ApiProperty({ example: 'Заголовок статьи' }) // 👈
  @IsString()
  title: string;

  @ApiProperty({ example: 'Содержимое статьи', required: false }) // 👈
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: true, required: false }) // 👈
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
