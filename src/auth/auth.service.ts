// src/auth/auth.service.ts

import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserRole, User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // /// START validateUser (логин)
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // /// END

  // /// START login (выдаёт access и refresh)
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role as UserRole,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '30d', secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret' });

    // Сохраняем refreshToken в БД (захешированным!)
    const hashedRefresh = await bcrypt.hash(refresh_token, 10);
    await this.userService.updateRefreshToken(user.id, hashedRefresh);

    return {
      access_token,
      refresh_token,
    };
  }
  // /// END

  // /// START refreshToken (выдача нового access)
  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException('Access denied');
    const refreshMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!refreshMatch) throw new ForbiddenException('Refresh token invalid');

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    };
  }
  // /// END

  // /// START logout
  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, undefined);
    return { message: 'Logout successful' };
  }
  // /// END
}
