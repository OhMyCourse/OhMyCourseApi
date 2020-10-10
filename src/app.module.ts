import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from './shared/services/config.service';

import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
