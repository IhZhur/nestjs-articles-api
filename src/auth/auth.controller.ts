// src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

// /// START: Swagger imports
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
// /// END

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // /// START login
  @ApiOperation({ summary: 'Логин пользователя, получить access и refresh токены' })
  @ApiResponse({ status: 201, description: 'JWT токены' })
  @Post('login')
  async login(
    @Body() body: { username?: string; password?: string }
  ) {
    // /// START: строгая проверка на undefined/null
    if (!body || !body.username || !body.password) {
      throw new UnauthorizedException('Username and password required');
    }
    // /// END

    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
  // /// END

  // /// START refresh
  @ApiOperation({ summary: 'Обновить access_token через refresh_token' })
  @ApiResponse({ status: 201, description: 'Новый access_token' })
  @Post('refresh')
  async refresh(@Body() body: { userId?: number; refreshToken?: string }) {
    // /// START: строгая проверка на undefined/null
    if (!body || typeof body.userId !== 'number' || !body.refreshToken) {
      throw new UnauthorizedException('userId and refreshToken required');
    }
    // /// END

    return this.authService.refreshToken(body.userId, body.refreshToken);
  }
  // /// END

  // /// START logout
  @ApiOperation({ summary: 'Logout: удалить refresh_token' })
  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    // /// START: безопасно получаем userId из req.user (JwtStrategy кладёт userId)
    const user: any = req.user;
    if (!user || !user.userId) {
      throw new UnauthorizedException('Invalid JWT payload');
    }
    // /// END

    return this.authService.logout(user.userId);
  }
  // /// END
}
