import { NestFactory } from '@nestjs/core';
import { MainModule } from '@app/main.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
