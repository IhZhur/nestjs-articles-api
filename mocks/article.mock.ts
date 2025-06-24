// mocks/article.mock.ts
import { Article } from '../src/article/article.entity';
import { mockUser } from './user.mock';

export const mockArticle: Article = {
  id: 1,
  title: 'Test article',
  content: 'Some content',
  published: true,
  user: mockUser,
  createdAt: new Date(),
  updatedAt: new Date(),
};
