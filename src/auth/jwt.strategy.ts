// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
// JWT стратегия для авторизации
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    // /// START: обновлённая секция конфигурации JwtStrategy /// 👈 updated
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not set in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // 👈 гарантировано строка
    });
    // /// END ///
  }

  // /// START: Исправленный вызов поиска пользователя /// 👈 updated
  async validate(payload: any) {
    // Используем существующий метод userService (например, findOne)
    const user = await this.userService.findOne(payload.sub); // 👈 исправлено
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // /// END ///
}
