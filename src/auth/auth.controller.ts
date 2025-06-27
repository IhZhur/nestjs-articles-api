// src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
// /// START
import { AuthTokensDto } from './dto/auth-tokens.dto'; // 👈 updated
// /// END

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // /// START login
  @ApiOperation({ summary: 'Логин пользователя, получить access и refresh токены' })
  @ApiResponse({ status: 201, description: 'JWT токены', type: AuthTokensDto }) // 👈 updated
  @ApiBody({ type: LoginDto }) // 👈 updated
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto.username || !loginDto.password) {
      throw new UnauthorizedException('Username and password required');
    }
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
  // /// END

  // /// START refresh
  @ApiOperation({ summary: 'Обновить access_token через refresh_token' })
  @ApiResponse({ status: 201, description: 'Новый access_token', type: AuthTokensDto }) // 👈 updated
  @ApiBody({ type: RefreshTokenDto }) // 👈 updated
  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    if (!body || typeof body.userId !== 'number' || !body.refreshToken) {
      throw new UnauthorizedException('userId and refreshToken required');
    }
    return this.authService.refreshToken(body.userId, body.refreshToken);
  }
  // /// END

  // /// START logout
  @ApiOperation({ summary: 'Logout: удалить refresh_token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Успешный выход', schema: { example: { message: 'Logout successful' } } }) // 👈 updated
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const user: any = req.user;
    if (!user || !user.userId) {
      throw new UnauthorizedException('Invalid JWT payload');
    }
    return this.authService.logout(user.userId);
  }
  // /// END
}
