import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const customLogger = app.get<Logger>(Logger);
  app.useLogger(customLogger);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
