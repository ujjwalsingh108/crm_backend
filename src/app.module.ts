import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.SERVER_TYPE as 'mssql',
      host: process.env.SERVER_NAME,
      port: 1433,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      options: {
        encrypt: true,
      },
      extra: {
        authentication: {
          type: 'NTLM',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
