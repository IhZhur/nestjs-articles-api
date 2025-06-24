// src/article/article.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // /// START create
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { userId, ...articleData } = createArticleDto;
    let user: User | null = null;
    if (userId) {
      user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
    }
    const article = this.articleRepository.create({
      ...articleData,
      ...(user ? { user } : {}),
    });
    return this.articleRepository.save(article);
  }
  // /// END

  // /// START findAll
  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['user'] });
  }
  // /// END

  // /// START findOne
  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }
  // /// END

  // /// START update
  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    await this.articleRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }
  // /// END

  // /// START remove
  async remove(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Article not found');
  }
  // /// END
}
