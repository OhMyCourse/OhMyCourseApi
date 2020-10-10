import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modules/course/course.module';
import { MediaModule } from './modules/media/media.module';

import { ConfigService } from './shared/services/config.service';

import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    MediaModule,
    CourseModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
