// src/user/dto/update-user.dto.ts

import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}
