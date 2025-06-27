// src/auth/dto/refresh-token.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ example: 7, description: 'ID пользователя' })
  userId: number;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh-токен (из /auth/login)',
  })
  refreshToken: string;
}
