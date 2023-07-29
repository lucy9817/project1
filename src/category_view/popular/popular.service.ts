// src/popular/popular.service.ts
import { Injectable } from '@nestjs/common';
import { LessonData, Teacher } from './interface/popular.interface';

const dummyTeachers: Teacher[] = [
  {
    StarIcon: '<StarIcon/>',
    lessonComment: '솜사탕 같이 만들어볼까요?',
    lessonExplain: '아이들에게 꿈같은 시간을 선물합니다.',
    lessonTeacher: '살구 선생님',
    lessonScore: 4.2,
    lessonDistance: '~234m',
    category:'수학',
  },{
    StarIcon: '<StarIcon/>',
    lessonComment: '솜사탕 같이 만들어볼까요?',
    lessonExplain: '아이들에게 꿈같은 시간을 선물합니다.',
    lessonTeacher: '살구 선생님',
    lessonScore: 4.2,
    lessonDistance: '~234m',
    category:'수학'
  },{
    StarIcon: '<StarIcon/>',
    lessonComment: '솜사탕 같이 만들어볼까요?',
    lessonExplain: '아이들에게 꿈같은 시간을 선물합니다.',
    lessonTeacher: '살구 선생님',
    lessonScore: 4.2,
    lessonDistance: '~234m',
    category: '수학',
  }
];

@Injectable()
export class PopularService {
  getTeachersByCategory(category: string): Teacher[] {
    // 실제 데이터 소스와 연동하여 카테고리에 맞는 선생님 목록을 가져오는 로직 구현
    // 이 예제에서는 더미데이터를 사용합니다.
    return dummyTeachers.filter((teacher) => teacher.category === category);
  }

  getTeachersBySortOrder(sortBy: string): Teacher[] {
    // 실제 데이터 소스와 연동하여 인기순, 추천순, 거리순으로 선생님 목록을 가져오는 로직 구현
    // 이 예제에서는 더미데이터를 사용합니다.
    switch (sortBy) {
      case 'popular':
        return dummyTeachers.sort((a, b) => b.lessonScore - a.lessonScore);
      case 'recommended':
        return dummyTeachers.filter((teacher) => teacher.lessonScore);
      case 'distance':
        return dummyTeachers.sort((a, b) => a.lessonDistance.localeCompare(b.lessonDistance));
      default:
        return [];
    }
  }
}
