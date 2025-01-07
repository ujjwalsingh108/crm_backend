import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, firstName, lastName, phone, password, role } =
        createUserDto;

      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      let tenant = await this.tenantRepository.findOne({ where: { email } });

      if (!tenant) {
        tenant = this.tenantRepository.create({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          isActive: true,
        });
        tenant = await this.tenantRepository.save(tenant);
      }

      const user = this.userRepository.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        tenantId: tenant.id,
        role,
        isActive: true,
      });

      return this.userRepository.save(user);
    } catch (error) {
      console.log('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
