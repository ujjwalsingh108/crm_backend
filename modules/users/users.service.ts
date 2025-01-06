import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, firstName, lastName, phone, password, role } = createUserDto;

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
      password,
      tenantId: tenant.id,
      role,
      isActive: true,
    });

    return this.userRepository.save(user);
  }
}
