import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { CreateUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private jwtService: JwtService,
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

  async signIn(
    email?: string,
    password?: string | Buffer<ArrayBufferLike>,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email || '');

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user?.id, email: user?.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
