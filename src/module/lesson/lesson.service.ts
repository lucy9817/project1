import { Injectable } from '@nestjs/common';
import { SearchLessonsDto } from './dto/search-lesson.dto';
import { Lesson } from './interface/lesson.interface';

@Injectable()
export class LessonService {
  async findOne(id: number): Promise<Lesson> {
    const lessonDetails = [
      {
        id: 1,
        title: '피아노 기초 강의',
        description: '피아노 기본 연습 및 기초 음악 이론 강의',
        duration: 60,
        category: 'music',
        teacher: 'sang hun',
        hashtag: '국악, 3~5세, 음악교사',
      },
      {
        id: 2,
        title: '그림 그리기',
        description: '그림 그리는 기법과 색채 이론을 배우는 강의',
        duration: 90,
        category: 'art',
        teacher: 'sal gu',
        hashtag: '동양화, 3~5세, 미술교사',
      },
      {
        id: 3,
        title: '과학 실험',
        description: '재밌는 과학 실험을 통해 과학 원리를 이해하는 강의',
        duration: 120,
        category: 'science',
        teacher: 'ta ill',
        hashtag: '생명, 3~5세, 과학교사',
      },
      // 다른 강의 상세 데이터 추가 가능
    ];

    return lessonDetails.find((lesson) => lesson.id === id);
  }

  async search(params: SearchLessonsDto): Promise<Lesson[]> {
    // @todo 필터 추가, 페이징 추가 (offset, limit)
    const { teacher, category, offest, limit } = params;
    const lessons = [
      {
        id: 1,
        category: 'music',
        teacher: 'sang hun',
        hashtag: '국악, 3~5세, 음악교사',
      },
      {
        id: 2,
        category: 'art',
        teacher: 'sal gu',
        hashtag: '동양화, 3~5세, 미술교사',
      },
      {
        id: 3,
        category: 'science',
        teacher: 'ta ill',
        hashtag: '생명, 3~5세, 과학교사',
      },
      // 다른 강의 데이터 추가 가능
    ];

    if (category !== null) {
      return lessons.filter((lesson) =>
        lesson.category.toLowerCase().includes(category.toLowerCase()),
      );
    }
    if (teacher !== null) {
      return lessons.filter((lesson) =>
        lesson.teacher.toLowerCase().includes(teacher.toLowerCase()),
      );
    }
    return lessons;
  }
}
