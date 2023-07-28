/* eslint-disable prettier/prettier */

export interface Teacher {
  id: number;
  name: string;
  age: number;
  gender: "Male" | "Female";
  subject: string;
  profileImage: string;
  reviewScore: number;
}

export interface TeacherProfile {
  id: number;
  name: string;
  subject: string;
  reviews: TeacherReview[]; // 선생님의 리뷰 목록
  // 다른 선생님 프로필 관련 정보들
}

export interface TeacherReview {
  id: number;
  userId: number; // 사용자의 ID
  rating: number;
  comment: string;
  // 다른 리뷰 관련 정보들
}

export interface TeacherResponse {
  teacher: Teacher;
  reviews: TeacherReview[];
}
