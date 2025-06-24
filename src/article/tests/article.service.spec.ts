/// START
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from '../article.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '../article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
// 👇 Импорт User и UserRole для mock
import { User, UserRole } from '../../user/user.entity';

describe('ArticleService', () => {
  let service: ArticleService;
  let repo: jest.Mocked<Repository<Article>>;

  // 👇 Мок пользователя для теста
  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    password: 'password',
    role: UserRole.USER,
    articles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    repo = module.get(getRepositoryToken(Article));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new article', async () => {
      const dto: CreateArticleDto = { title: 'Test', content: 'Body' };
      // 👇 Теперь created должен содержать поле author (User)
      const created = { id: 1, ...dto, published: false, author: mockUser };

      // 👇 mock create и save работают с author
      repo.create.mockReturnValue(created as Article);
      repo.save.mockResolvedValue(created as Article);

      // 👇 Передаём mockUser!
      const result = await service.create(dto, mockUser);

      expect(result).toEqual(created);
      // 👇 Проверка, что author прокидывается
      expect(repo.create).toHaveBeenCalledWith({ ...dto, author: mockUser });
      expect(repo.save).toHaveBeenCalledWith(created);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const articles = [{ id: 1, title: 'One', published: false, author: mockUser }];
      repo.find.mockResolvedValue(articles as Article[]);

      const result = await service.findAll({});
      expect(result).toEqual(articles);
    });
  });
});
/// END
