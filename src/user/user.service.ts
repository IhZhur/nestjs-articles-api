// src/user/user.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'; // /// START: импорт bcrypt



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // /// START create
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (existing) {
      throw new ConflictException('Username already exists');
    }

    // /// START: Хешируем пароль перед сохранением
    const hash = await bcrypt.hash(createUserDto.password, 10);
    // /// END

    // Преобразуем строку-роль в UserRole (на всякий случай)
    const role: UserRole =
      createUserDto.role && Object.values(UserRole).includes(createUserDto.role)
        ? createUserDto.role
        : UserRole.USER;

    // /// START: Записываем захешированный пароль
    const user = this.userRepository.create({
      ...createUserDto,
      password: hash,
      role,
    });
    // /// END

    return this.userRepository.save(user);
  }
  // /// END

  // /// START findAll
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['articles'] });
  }
  // /// END

  // /// START обновить refreshToken
  async updateRefreshToken(userId: number, refreshToken: string | undefined): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }
  // /// END

  // /// START findOne
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['articles'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  // /// END

  // /// START update
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let role: UserRole | undefined;
    if (updateUserDto.role && Object.values(UserRole).includes(updateUserDto.role)) {
      role = updateUserDto.role;
    }

    // /// START: Если обновляется пароль — хешируем
    let updateData: Partial<User> = { ...updateUserDto, ...(role ? { role } : {}) };
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    // /// END

    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }
  // /// END

  // /// START remove
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (!result.affected) throw new NotFoundException('User not found');
  }
  // /// END

  // /// START findByUsername
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
  // /// END
}
