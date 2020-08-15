import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const port = process.env.PORT || config.get('server').port;
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port);
}
bootstrap();
