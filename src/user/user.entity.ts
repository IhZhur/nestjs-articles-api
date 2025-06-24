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

// /// START RBAC: enum ролей
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
// /// END

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // /// START RBAC: роль
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
  // /// END

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
