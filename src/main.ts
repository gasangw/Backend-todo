import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // throw an error if there are non-whitelisted properties
      transform: true, // automatically transform the incoming data to DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
