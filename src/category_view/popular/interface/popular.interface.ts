// popular.interface.ts
import { TeacherController } from "src/module/teacher/teacher.controller";

export interface Teacher {
  lessonTeacher: string;
  lessonComment: string;
  lessonExplain: string;
  lessonScore: number;
  lessonDistance: string;
  StarIcon: string;
  category?: string;
}

export interface LessonData extends Teacher {
  lessonTeacher: string;
  lessonScore: number;
  lessonDistance: string;
}
