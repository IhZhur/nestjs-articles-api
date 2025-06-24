// src/article/article.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true, type: 'text' })
  content?: string;

  @Column({ default: false })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date; // 👈 добавлено

  @UpdateDateColumn()
  updatedAt: Date; // 👈 добавлено

  // /// START связь с пользователем
  @ManyToOne(() => User, (user) => user.articles, { onDelete: 'CASCADE' })
  user: User;
  // /// END
}
