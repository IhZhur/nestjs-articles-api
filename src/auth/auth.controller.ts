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
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
  // /// END

  // /// START refresh
  @ApiOperation({ summary: 'Обновить access_token через refresh_token' })
  @ApiResponse({ status: 201, description: 'Новый access_token' })
  @Post('refresh')
  async refresh(@Body() body: { userId: number; refreshToken: string }) {
    return this.authService.refreshToken(body.userId, body.refreshToken);
  }
  // /// END

  // /// START logout
  @ApiOperation({ summary: 'Logout: удалить refresh_token' })
  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    // user приходит из JwtStrategy
    // @ts-ignore
    const userId = req.user.userId;
    return this.authService.logout(userId);
  }
  // /// END
}
