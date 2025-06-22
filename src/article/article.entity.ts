// src/article/article.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number; // 👈 auto-increment

  @Column()
  title: string; // 👈 required

  @Column({ nullable: true })
  content?: string; // 👈 optional

  @Column({ default: false })
  published: boolean; // 👈 default: false
}
