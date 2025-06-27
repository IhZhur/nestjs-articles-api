// src/user/dto/create-user.dto.ts

import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';
// /// START
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // 👈 updated
// /// END

export class CreateUserDto {
  // /// START
  @ApiProperty({ example: 'user1', description: 'Имя пользователя (уникально)' }) // 👈 updated
  @IsString()
  readonly username: string;
  // /// END

  // /// START
  @ApiProperty({ example: 'password123', description: 'Пароль' }) // 👈 updated
  @IsString()
  readonly password: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ enum: UserRole, description: 'Роль пользователя' }) // 👈 updated
  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
  // /// END
}
