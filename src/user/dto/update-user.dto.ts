// src/user/dto/update-user.dto.ts

import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';
// /// START
import { ApiPropertyOptional } from '@nestjs/swagger'; // 👈 updated
// /// END

export class UpdateUserDto {
  // /// START
  @ApiPropertyOptional({ example: 'new_user', description: 'Новое имя пользователя' }) // 👈 updated
  @IsOptional()
  @IsString()
  readonly username?: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ example: 'new_password', description: 'Новый пароль' }) // 👈 updated
  @IsOptional()
  @IsString()
  readonly password?: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ enum: UserRole, description: 'Роль пользователя' }) // 👈 updated
  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
  // /// END
}
