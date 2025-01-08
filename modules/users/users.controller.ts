import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch(':id/deactivate')
  async deactivateUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deactivateUser(id);
  }
}
