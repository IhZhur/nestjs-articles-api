import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from '../article.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '../article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';

describe('ArticleService', () => {
  let service: ArticleService;
  let repo: jest.Mocked<Repository<Article>>;

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
      const created = { id: 1, ...dto, published: false };

      repo.create.mockReturnValue(created as Article);
      repo.save.mockResolvedValue(created as Article);

      const result = await service.create(dto);
      expect(result).toEqual(created);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(created);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const articles = [{ id: 1, title: 'One', published: false }];
      repo.find.mockResolvedValue(articles as Article[]);

      const result = await service.findAll({});
      expect(result).toEqual(articles);
    });
  });
});
