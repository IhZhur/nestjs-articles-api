import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user1', description: 'Имя пользователя' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'userpass', description: 'Пароль' })
  @IsString()
  @MinLength(6)
  password: string;
}
