// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Простая имитация юзера
  private readonly user = {
    id: 1,
    username: 'admin',
    password: 'password',
  };

  async validateUser(username: string, password: string) {
    if (username === this.user.username && password === this.user.password) {
      const { password, ...result } = this.user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async authenticate(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return this.login(user);
  }
}
