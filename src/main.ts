import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Nestjs Todo API')
    .setDescription(
      'This will enable you to create, read, and delete tasks as well as asign categories to them',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local server')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('Nestjs-Todo-API', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // throw an error if there are non-whitelisted properties
      transform: true, // automatically transform the incoming data to DTO
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
