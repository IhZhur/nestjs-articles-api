// roles.decorator.ts
// --- Декоратор для назначения ролей (UserRole) на маршруты или контроллеры
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/user.entity';

// Ключ метаданных, который будет использоваться в RolesGuard
export const ROLES_KEY = 'roles';

// Декоратор @Roles(...roles), где roles — UserRole[]
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
/// END