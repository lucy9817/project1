import { Module } from '@nestjs/common';
import { LessonModule } from './module/lesson/lesson.module';
import { TeacherModule } from './module/teacher/teacher.module';
import { UserModule } from './module/user/user.module';
import { BoardModule } from './module/board/board.module';


@Module({
  imports: [
    LessonModule,
    TeacherModule,
    UserModule,
    BoardModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
