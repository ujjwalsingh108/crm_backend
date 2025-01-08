import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../modules/authentication/auth.module';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '123456',
      database: 'crm',
      autoLoadEntities: true,
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
