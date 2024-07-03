import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDB } from './database.init';
import * as morgan from 'morgan';

async function bootstrap() {
  await initDB();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('combined'));
  await app.listen(3000);
}

bootstrap();