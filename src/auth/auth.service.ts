// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // /// START аутентификация пользователя
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // /// END

  // /// START генерация JWT с ролью
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role as UserRole,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  // /// END
}
