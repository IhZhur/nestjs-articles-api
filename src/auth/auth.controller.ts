// src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// /// START: Swagger imports
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
// /// END

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // /// START login (выдаёт токен)
  @ApiOperation({ summary: 'Логин пользователя, получить JWT' })
  @ApiResponse({ status: 201, description: 'JWT токен' })
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
  // /// END

  // /// Здесь можно добавить refresh, logout и т.д.
}
