/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Query, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiQuery } from "@nestjs/swagger";
import { TeacherProfile, TeacherReview } from "./interface/teacher.interface";

@ApiTags("teacher")
@Controller("teacher")
export class TeacherController {
  private teachers: TeacherProfile[] = [
    {
      childname: '상훈',
      gender: '남성',
      age: 30,
      rating: 4.2,
      distance: 232,
      phonenumber: '01012345678',
      place: '서울 스페이스 살림 다목적홀',
      reviews: [], // 리뷰 목록은 비어있습니다. 리뷰는 따로 추가해야 합니다.
    },
  ];

  // 선생님 프로필 조회 API
  @ApiOperation({ summary: "선생님 프로필 조회", description: "선생님의 프로필을 조회합니다." })
  @ApiQuery({ name: "id", description: "Teacher ID", type: Number })
  @ApiResponse({
    status: 200,
    description: "Success",
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'TeacherProfile' },
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
        data: { $ref: 'Null' },
        message: { type: 'string' },
      },
    },
  })
  @Get(":id")
  getTeacherProfile(@Param("id") teacherId: number): {
    result: boolean;
    data: TeacherProfile;
    message: string;
  } {
    const teacherProfile = this.teachers.find((teacher) => teacher.childname === String(teacherId));




    if (!teacherProfile) {
      throw new NotFoundException("해당 ID의 선생님 프로필을 찾을 수 없습니다.");
    }

    return {
      result: true,
      message: "선생님 프로필을 조회합니다.",
      data: teacherProfile,
    };
  }

  // 선생님 리뷰 조회 API
  @ApiOperation({ summary: "선생님 리뷰 조회", description: "선생님의 리뷰 목록을 조회합니다." })
  @ApiQuery({ name: "id", description: "Teacher ID", type: Number })
  @ApiResponse({
    status: 200,
    description: "Success",
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'TeacherReview' },
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
        data: { $ref: 'Null' },
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
    const teacherProfile = this.teachers.find((teacher) => teacher.childname === String(teacherId));

    if (!teacherProfile) {
      throw new NotFoundException("해당 ID의 선생님 프로필을 찾을 수 없습니다.");
    }

    return {
      result: true,
      message: "선생님의 리뷰를 조회합니다.",
      data: teacherProfile.reviews,
    };
  }

  // 선생님 글쓰기 목록 조회 API
  @ApiOperation({ summary: "선생님 글쓰기 목록 조회", description: "선생님 글쓰기 목록을 조회합니다." })
  @ApiResponse({
    status: 200,
    description: "Success",
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'TeacherProfile' },
        message: { type: 'string' },
      },
    },
  })
  @Get("writing")
  getTeacherWritingList(): {
    result: boolean;
    data: TeacherProfile[];
    message: string;
  } {
    // 선생님 글쓰기 목록 조회 로직을 구현해야 합니다.
    // 이 예제에서는 teachers 배열에 있는 선생님 프로필들을 그대로 반환합니다.
    return {
      result: true,
      message: "선생님 글쓰기 목록을 조회합니다.",
      data: this.teachers,
    };
  }
}
