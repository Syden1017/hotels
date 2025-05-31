import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { SearchUserParams } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    try {
      return this.userService.findById(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async findAll(@Query() params: SearchUserParams): Promise<User[]> {
    return this.userService.findAll(params);
  }
}
