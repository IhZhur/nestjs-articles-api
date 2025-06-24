// src/user/dto/create-user.dto.ts

import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}
