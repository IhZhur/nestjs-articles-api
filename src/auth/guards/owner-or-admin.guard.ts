// src/auth/guards/owner-or-admin.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OWNER_CHECK_KEY, OwnerCheckMeta } from '../decorators/owner-check.decorator';
import { UserRole } from '../../user/user.entity';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) throw new ForbiddenException('Нет авторизации');

    // Получаем meta из декоратора
    const meta: OwnerCheckMeta = this.reflector.get<OwnerCheckMeta>(OWNER_CHECK_KEY, context.getHandler());
    if (!meta) return false;

    // Admin всегда можно
    if (user.role === UserRole.ADMIN) return true;

    // Получаем id сущности из params
    const entityId = Number(req.params.id);
    if (!entityId) throw new ForbiddenException('Некорректный id');

    // Получаем сервис через appContext
    const service = req.app.get(meta.service);
    if (!service) throw new ForbiddenException('Ошибка Guard: сервис не найден');

    // Получаем сущность через метод (например, findOne)
    const entity = await service[meta.findMethod](entityId);
    if (!entity) throw new ForbiddenException('Сущность не найдена');

    // Получаем id владельца по ownerField (например, 'user.id')
    let ownerId = entity;
    for (const prop of meta.ownerField.split('.')) {
      if (ownerId && typeof ownerId === 'object') ownerId = ownerId[prop];
      else break;
    }
    if (ownerId === user.userId) return true;

    throw new ForbiddenException('Доступ разрешён только админу или владельцу!');
  }
}
