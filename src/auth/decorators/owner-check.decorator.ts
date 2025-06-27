// src/auth/decorators/owner-check.decorator.ts

import { SetMetadata } from '@nestjs/common';

// Ключ для метаданных NestJS
export const OWNER_CHECK_KEY = 'owner_check';

// Тип для удобства автодополнения
export interface OwnerCheckMeta {
  service: any;         // Класс сервиса (UserService, ArticleService)
  findMethod: string;   // Метод поиска (обычно 'findOne')
  ownerField: string;   // Путь к id владельца ('user.id', 'id')
}

// Декоратор для использования в контроллере
export const OwnerCheck = (meta: OwnerCheckMeta) => SetMetadata(OWNER_CHECK_KEY, meta);
