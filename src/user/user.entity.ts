// src/user/user.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from '../article/article.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer'; // 👈 обязательно импортируй

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user1' })
  @Column({ unique: true })
  username: string;

  // /// START
  @ApiProperty({ example: 'hashed_password', description: 'Захешированный пароль', writeOnly: true })
  @Exclude() // 👈 добавлено
  @Column()
  password: string;
  // /// END

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  // /// START
  @ApiPropertyOptional({ example: 'refresh_token', description: 'Refresh-токен (хранится захешированным)', writeOnly: true })
  @Exclude() // 👈 добавлено
  @Column({ nullable: true })
  refreshToken?: string;
  // /// END

  @ApiPropertyOptional({ type: () => [Article] })
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
