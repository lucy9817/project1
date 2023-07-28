/* eslint-disable prettier/prettier */

export interface Lesson {
  id: number;
  category: string;
  teacher: string;
  capacity: number;
  // 다른 강의 관련 정보들
}

export interface LessonDetail {
  id: number;
  category: string;
  teacher: string;
  capacity: number;
  description: string;
  schedule: string;
  // 다른 강의 상세 정보들
}


// 다른 코드들과 함께 사용될 수 있습니다.

