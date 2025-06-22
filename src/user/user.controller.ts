import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

// /// START: Swagger-декораторы /// 👈 updated
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
// /// END

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, description: 'Регистрация пользователя.' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @ApiResponse({ status: 200, description: 'Получить всех пользователей.' })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
