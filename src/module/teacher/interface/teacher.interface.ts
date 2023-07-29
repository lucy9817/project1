/* eslint-disable prettier/prettier */
export interface TeacherProfile {
  childname: string; // 아이 이름
  gender: "남성" | "여성"; // 성별
  age: number; // 나이대
  rating: number; // 별점
  distance: number; // 거리 (단위: km 또는 mile 등)
  phonenumber: string; // 휴대폰 번호
  place: string; // 장소
  reviews: TeacherReview[]; // 리뷰 목록
}

export interface TeacherReview {
  id: number; // 리뷰 고유 ID
  content: string; // 리뷰 내용
  rating: number; // 리뷰 별점
}

