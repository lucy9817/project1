import { Injectable } from '@nestjs/common';
import { TeacherProfile, TeacherReview } from './interface/teacher.interface';

@Injectable()
export class TeacherService {
  // 선생님 데이터는 어딘가에 저장되어 있다고 가정하고 로직 구현

  // 특정 teacherId에 해당하는 선생님의 정보와 리뷰 목록을 반환하는 메서드
  getTeacherProfile(teacherId: number): TeacherProfile {
    //일단은 더미데이터로 구현
    const teacher: TeacherProfile = {
      childname: '아이 이름',
      gender: '남성',
      age: 30,
      rating: 4.8,
      distance: 3.5,
      phonenumber: '010-1234-5678',
      place: '서울',
      reviews: [
        { id: 1, content: '정말 멋진 선생님입니다. 수업 목적에 맞추어 수업을 진행해주시고 목표달성을 위해 끝까지 함께해주십니다.' , rating: 5},
        { id: 1, content: '정말 멋진 선생님입니다. 수업 목적에 맞추어 수업을 진행해주시고 목표달성을 위해 끝까지 함께해주십니다.' , rating: 5},
        { id: 1, content: '정말 멋진 선생님입니다. 수업 목적에 맞추어 수업을 진행해주시고 목표달성을 위해 끝까지 함께해주십니다.' , rating: 5},
        { id: 1, content: '정말 멋진 선생님입니다. 수업 목적에 맞추어 수업을 진행해주시고 목표달성을 위해 끝까지 함께해주십니다.' , rating: 5},
        { id: 1, content: '정말 멋진 선생님입니다. 수업 목적에 맞추어 수업을 진행해주시고 목표달성을 위해 끝까지 함께해주십니다.' , rating: 5},
        { id: 1, content: '정말 멋진 선생님입니다. 수업 목적에 맞추어 수업을 진행해주시고 목표달성을 위해 끝까지 함께해주십니다.' , rating: 5},

        // 리뷰 데이터가 더 있을 수 있습니다.
      ],
    };

    return teacher;
  }
}
