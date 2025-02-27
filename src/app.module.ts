import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../modules/authentication/auth.module';
import { SupabaseService } from './../database/supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
  ],
  providers: [SupabaseService], // Provide SupabaseService globally
  exports: [SupabaseService], // Export it for other modules
})
export class AppModule {}
