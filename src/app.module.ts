import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modules/course/course.module';
import { LessonModule } from './modules/course/lesson/lesson.module';
import { MediaModule } from './modules/media/media.module';
import { UserModule } from './modules/user/user.module';

import { ConfigService } from './shared/services/config.service';

import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    MediaModule,
    CourseModule,
    LessonModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule { }
