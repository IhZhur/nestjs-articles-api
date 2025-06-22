// src/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
// Сервис работы с пользователями
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // /// START: Поиск пользователя по ID /// 👈 updated
  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  // /// END

  // /// START: Поиск пользователя по email /// 👈 updated
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
  // /// END

  // /// START: Создание пользователя /// 👈 updated
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }
  // /// END

  // /// START: Обновление пользователя /// 👈 updated
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
  // /// END

  // /// START: Удаление пользователя /// 👈 updated
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  // /// END

  // /// START: Получить всех пользователей (например, для админа) /// 👈 updated
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  // /// END
}
