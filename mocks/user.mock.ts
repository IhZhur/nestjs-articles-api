// mocks/user.mock.ts
import { User, UserRole } from '../src/user/user.entity';

export const mockUser: User = {
  id: 1,
  username: 'testuser',
  password: 'hashedpass',
  role: UserRole.USER,
  articles: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
