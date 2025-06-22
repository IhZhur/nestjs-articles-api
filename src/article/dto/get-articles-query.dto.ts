// DTO
import { IsOptional, IsBooleanString, IsNumberString } from 'class-validator';

export class GetArticlesQueryDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsBooleanString()
  published?: string;
}
