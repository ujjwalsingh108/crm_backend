import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        select: ['id', 'firstName', 'middleName', 'lastName', 'email'],
      });
    } catch (error) {
      throw new Error('Failed to fetch users: ' + error);
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'middleName',
        'lastName',
        'email',
        'isActive',
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async deactivateUser(id: string): Promise<User> {
    const user = await this.findById(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }
}
