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
// /// START
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // 👈 updated
// /// END

@Entity()
export class Article {
  // /// START
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  // /// END

  // /// START
  @ApiProperty({ example: 'Заголовок статьи' })
  @Column({ nullable: false })
  title: string;
  // /// END

  // /// START
  @ApiPropertyOptional({ example: 'Содержимое статьи' })
  @Column({ nullable: true, type: 'text' })
  content?: string;
  // /// END

  // /// START
  @ApiProperty({ example: false })
  @Column({ default: false })
  published: boolean;
  // /// END

  // /// START
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  // /// END

  // /// START
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
  // /// END

  // /// START
  @ApiPropertyOptional({ type: () => User, description: 'Автор статьи' })
  @ManyToOne(() => User, (user) => user.articles, { onDelete: 'CASCADE' })
  user: User;
  // /// END
}
