import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { TalentListController } from './talent-list/talent-list.controller';
import { TeacherController } from './teacher/teacher.controller';
import { LessonController } from './lesson/lesson.controller';
import { BoardController } from './post/board.controller';
import { UserController } from './user/user.controller';

@ApiTags('app') // 해당 컨트롤러의 API가 'app' 태그에 속함을 나타냄
@Module({
  imports: [],
  controllers: [
    AppController,
    TalentListController,
    TeacherController,
    LessonController,
    BoardController,
    UserController,
  ],
  providers: [AppService],
})
export class AppModule {}
