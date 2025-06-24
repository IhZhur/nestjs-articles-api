// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './guards/roles.guard'; // /// START RBAC: Guard
import { APP_GUARD } from '@nestjs/core'; // /// START

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // /// START RBAC: глобальный Guard для ролей
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // /// END
  ],
  exports: [AuthService],
})
export class AuthModule {}
