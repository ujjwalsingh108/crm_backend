import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger());
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // If using cookies or authentication
  });
  await app.listen(process.env.PORT || 3005);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT}}`,
  );
}
bootstrap();
