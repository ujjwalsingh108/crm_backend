import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '123456',
      database: 'crm',
      autoLoadEntities: true,
      // synchronize: true,
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
