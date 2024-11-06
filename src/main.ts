import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // dto에 데코레이터 적용시키기 위해서 필요한 코드
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8888);
}
bootstrap();
