import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will remove any additional properties that are not in the DTO
      forbidNonWhitelisted: true, // This will throw an error if there are any additional properties that are not in the DTO
    }),
  ); // This will enable the global validation pipe which means that all the incoming requests will be validated by the class-validator package.

  await app.listen(3000);
}
bootstrap();
