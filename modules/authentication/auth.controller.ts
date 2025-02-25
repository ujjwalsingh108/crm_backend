import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async signup(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.create(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = signInDto;

    // 1. Check if password is a Buffer and convert if necessary:
    const passwordToCompare =
      password && typeof password === 'string' ? password : password.toString(); // Convert Buffer to string

    // 2. Call the service method:
    return this.authService.signIn(email, passwordToCompare);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
