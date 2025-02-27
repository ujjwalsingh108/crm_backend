import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from './../../database/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private supabase: SupabaseService,
  ) {}

  async create(signUpDto: SignUpDto) {
    const { email, password, firstName, middleName, lastName, phone, role } =
      signUpDto;

    // Step 1: Create a tenant
    const tenantName = `${firstName} ${lastName}`.trim();
    const { data: tenantData, error: tenantError } = await this.supabase
      .getClient()
      .from('tenants')
      .insert([{ name: tenantName, email, phone }])
      .select('id') // Select only the ID
      .single();

    if (tenantError) {
      throw new InternalServerErrorException(
        `Tenant creation failed: ${tenantError.message}`,
      );
    }

    const tenantId = tenantData.id; // Get the newly created tenant ID

    // Step 2: Sign up the user in Supabase Auth with the tenant ID
    const { data, error } = await this.supabase.getAuthClient().signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          middleName,
          lastName,
          phone,
          tenant_id: tenantId,
          role,
        }, // Store tenant ID in metadata
      },
    });

    if (error) {
      throw new InternalServerErrorException(
        `User sign-up failed: ${error.message}`,
      );
    }

    return data.user;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase
      .getAuthClient()
      .signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Supabase already provides a session token
    return {
      session: data.session, // Contains access_token, refresh_token
      user: data.user, // User details
      redirectUrl: 'http://localhost:3000/profile', // Redirect URL after login
    };
  }

  async deleteAuthUser(id: string) {
    const { error } = await this.supabase.getAuthClient().admin.deleteUser(id);

    if (error) {
      console.log(`Error deleting user: ${error.message}`);
    } else {
      console.log('User deleted successfully');
    }
  }
}
