import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../modules/authentication/auth.module';
import { UsersModule } from 'modules/users/users.module';
import { LeadsModule } from 'modules/leads/leads.module';
import { SupabaseService } from './../database/supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    LeadsModule,
  ],
  providers: [SupabaseService], // Provide SupabaseService globally
  exports: [SupabaseService], // Export it for other modules
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from '../modules/authentication/auth.module';
// import { UsersModule } from 'modules/users/users.module';
// import { LeadsModule } from 'modules/leads/leads.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: '.env',
//     }),
//     TypeOrmModule.forRoot({
//       type: process.env.DB_TYPE as 'mssql',
//       host: process.env.HOST,
//       port: Number(process.env.DB_PORT),
//       username: 'sa',
//       password: process.env.PASSWORD,
//       database: process.env.DB_NAME,
//       autoLoadEntities: true,
//       options: {
//         encrypt: false,
//         enableArithAbort: true,
//       },
//     }),
//     AuthModule,
//     UsersModule,
//     LeadsModule
//   ],
// })
// export class AppModule {}

