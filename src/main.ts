import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(ConfigService);

  setupSwagger(app);

  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(configService.getNumber('APP_PORT'));
}

bootstrap();
