// src/user/user.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole, User } from './user.entity';
import { OwnerOrAdminGuard } from '../auth/guards/owner-or-admin.guard'; // 👈
import { OwnerCheck } from '../auth/decorators/owner-check.decorator';  // 👈

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь создан', type: User })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Массив пользователей', type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Получить пользователя по id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Пользователь', type: User })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // --- Только владелец или admin ---
  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Обновлённый пользователь', type: User })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  @OwnerCheck({
    service: UserService,
    findMethod: 'findOne',
    ownerField: 'id',
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // --- Только admin (через @Roles) ---
  @ApiOperation({ summary: 'Удалить пользователя (только admin)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Пользователь удалён' })
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
