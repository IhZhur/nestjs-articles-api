// src/article/article.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: number): Promise<Article> {
  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');
  const article = this.articleRepository.create({
    ...createArticleDto,
    user,
  });
  return await this.articleRepository.save(article);
}
  // /// END

  // /// START findAll c фильтрами и сортировкой
  async findAll(query: QueryArticleDto): Promise<Article[]> {
    const qb: SelectQueryBuilder<Article> = this.articleRepository.createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user');

    // /// START фильтр по поиску (title/content)
    if (query.search) {
      qb.andWhere('article.title LIKE :search OR article.content LIKE :search', { search: `%${query.search}%` });
    }
    // /// END

    // /// START сортировка
    const allowedSortFields = ['createdAt', 'title', 'published', 'updatedAt'];
    const sortField = query.sort && allowedSortFields.includes(query.sort) ? query.sort : 'createdAt';
    const order = query.order === 'asc' ? 'ASC' : 'DESC';

    qb.orderBy(`article.${sortField}`, order);
    // /// END

    return qb.getMany();
  }
  // /// END

  // /// START findOne (без изменений)
  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }
  // /// END

  // /// START update (без изменений)
  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    await this.articleRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }
  // /// END

  // /// START remove (без изменений)
  async remove(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Article not found');
  }
  // /// END
}
