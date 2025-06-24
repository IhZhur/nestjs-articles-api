import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // 👈 добавь импорт
import { UserRole } from '../../user/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Пароль (минимум 6 символов)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: UserRole, description: 'Роль пользователя (admin, user)' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
