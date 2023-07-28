/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  NotFoundException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { Teacher, TeacherProfile, TeacherReview, TeacherResponse } from "./teacherResponse.interface";
  

@ApiTags("teacher")
@Controller("teacher")
export class TeacherController {
  private teachers: Teacher[] = [
    {
      id: 1,
      name: "sang hoon",
      age: 30,
      gender: "Male",
      subject: "Music",
      profileImage: "profile1.jpg",
      reviewScore: 4.4,
    },
    {
      id: 2,
      name: "ta ill",
      age: 20,
      gender: "Male",
      subject: "Art",
      profileImage: "profile2.jpg",
      reviewScore: 4.5,
    },
    {
      id: 3,
      name: "sal gu",
      age: 20,
      gender: "Male",
      subject: "Science",
      profileImage: "profile3.jpg",
      reviewScore: 4.3,
    },
  ];

  private teacherProfiles: TeacherProfile[] = [];
  teacherReviewIdCounter: any;

@ApiOperation({ summary: "선생님에 대한 리뷰 작성" ,  description: ' 특정 강의 선생님에 대한 리뷰를 작성합니다.'})
@ApiBadRequestResponse({ description: "잘못된 요청" })
@ApiResponse({
  status: 201,
  description: "생성됨",
  schema: {
    type: 'object',
    properties: {
      result: { type: 'boolean' },
      data: { $ref: 'TeacherReview' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
      message: { type: 'string' },
    },
  },
})
  @Post(":id/reviews")
  writeTeacherReview(
    @Param("id") teacherId: number,
    @Body() reviewData: TeacherReview
  ): { result: boolean; data: TeacherReview; message: string } {
    const teacherProfile = this.teacherProfiles.find(
      (profile) => profile.id === teacherId
    );

    if (!teacherProfile) {
      throw new NotFoundException(
        "해당 ID의 선생님 프로필을 찾을 수 없습니다."
      );
    }

    const newReview: TeacherReview = {
      id: this.teacherReviewIdCounter++, // teacherReviewIdCounter도 정의되어 있어야 합니다
      userId: reviewData.userId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      // 다른 리뷰 데이터들
    };
    teacherProfile.reviews.push(newReview);

    return {
      result: true,
      message: "선생님 프로필에 리뷰가 작성되었습니다.",
      data: newReview,
    };
  }

  @ApiOperation({ summary: "선생님에 대한 리뷰 조회", description: ' 특정 강의 선생님에 대한 리뷰를 조회합니다.' })
  @ApiQuery({ name: "id", description: "Teacher ID", type: Number })
  @ApiResponse({
    status: 200,
    description: "Success",
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'TeacherReview' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'Null' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
        message: { type: 'string' },
      },
    },
  })
  @Get(":id/reviews")
  getTeacherReviews(@Param("id") teacherId: number): {
    result: boolean;
    data: TeacherReview[];
    message: string;
  } {
    const teacherProfile = this.teacherProfiles.find(
      (profile) => profile.id === teacherId
    );

    if (!teacherProfile) {
      throw new NotFoundException(
        "해당 ID의 선생님 프로필을 찾을 수 없습니다."
      );
    }

    return {
      result: true,
      message: "선생님의 리뷰를 조회합니다.",
      data: teacherProfile.reviews,
    };
  }

  @ApiOperation({
    summary: "추천순 인기 급상승한 선생님 목록",
    description: "최근 일정 기간 동안 추천이 많이 받은 선생님들의 목록을 제공합니다.",
  })
  @ApiQuery({
    name: "order",
    description: "Order (asc or desc)",
    enum: ["asc", "desc"],
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Success",
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'TeacherResponse' },
        message: { type: 'string' },
      },
    },
  })
  @Get("top-recommended")
  getTopRecommendedTeachers(@Query("order") order: "asc" | "desc"): {
    result: boolean;
    message: string;
    data: TeacherResponse[];
  } {
    const teachersWithTotalRecommendations = this.teachers.map((teacher) => {
      const teacherProfile = this.teacherProfiles.find(
        (profile) => profile.id === teacher.id
      );
      const totalRecommendations = teacherProfile
        ? teacherProfile.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          )
        : 0;
      return { teacher, totalRecommendations };
    });
  
    let sortedTeachers: TeacherResponse[];
  
    if (order === "asc") {
      sortedTeachers = teachersWithTotalRecommendations
        .slice()
        .sort((a, b) => a.totalRecommendations - b.totalRecommendations)
        .map(({ teacher }) => ({ teacher, reviews: [] }));
    } else {
      sortedTeachers = teachersWithTotalRecommendations
        .slice()
        .sort((a, b) => b.totalRecommendations - a.totalRecommendations)
        .map(({ teacher }) => ({ teacher, reviews: [] }));
    }
  
    return {
      result: true,
      message: "추천이 많은 순으로 선생님 목록을 조회합니다.",
      data: sortedTeachers,
    };
  }

  @ApiOperation({ summary: "거리가 가까운 선생님" ,
  description: '사용자의 위치 또는 주소 기반으로, 거리가 가까운 선생님들의 목록을 제공합니다.'})
  @ApiResponse({
    status: 200,
    description: "Success",
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'Teacher' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
        message: { type: 'string' },
      },
    },
  })
  @Get("nearby")
getNearbyTeachers(): {
  result: boolean;
  message: string;
  data: TeacherResponse[];
} {
  // 여기에서 사용자의 위치 정보를 받아와서 선생님과의 거리를 계산하여 가까운 순서대로 정렬.
  // 하지만 거리 계산을 위한 기능은 여기서 구현하지 않음

  // 가까운 순서대로 정렬된 선생님 목록 생성
  const nearbyTeachers = this.teachers.map((teacher) => ({
    teacher,
    reviews: [],
  }));

  return {
    result: true,
    message: "거리가 가까운 선생님 목록을 조회합니다.",
    data: nearbyTeachers,
  };
}

}
