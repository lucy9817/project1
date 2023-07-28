import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Lesson, LessonDetail } from './lesson.interface';

@ApiTags('lesson')
@Controller('lesson')
export class LessonController {
  private lessons: Lesson[] = [];
  private lessonDetails: LessonDetail[] = [];

  @ApiOperation({ summary: '각 종 강의 리스트 조회' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'Lesson' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
        message: { type: 'string' },
      },
    },
  })
  @Get()
  getAllLessons(): { result: boolean; data: Lesson[]; message: string } {
    return {
      result: true,
      message: '각 종 강의 리스트를 조회합니다.',
      data: this.lessons,
    };
  }

  @ApiOperation({ summary: '강의 상세 데이터' })
  @ApiQuery({ name: 'id', description: 'Lesson ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'LessonDetail' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'null' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
        message: { type: 'string' },
      },
    },
  })
  @Get(':id')
  getLessonDetail(@Param('id') id: number): {
    result: boolean;
    data: LessonDetail;
    message: string;
  } {
    const lessonDetail = this.lessonDetails.find((lesson) => lesson.id === id);

    if (!lessonDetail) {
      return {
        result: false,
        message: '해당 ID의 강의 상세 정보를 찾을 수 없습니다.',
        data: null,
      };
    }

    return {
      result: true,
      message: '강의 상세 정보를 조회합니다.',
      data: lessonDetail,
    };
  }

  @ApiOperation({ summary: '강의 생성' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'Lesson' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
        message: { type: 'string' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  createLesson(@Body() lessonData: Lesson): {
    result: boolean;
    data: Lesson;
    message: string;
  } {
    if (lessonData.capacity > 8) {
      throw new BadRequestException(
        '강의 인원 수는 최대 8명까지 설정 가능합니다.',
      );
    }

    const newLesson: Lesson = {
      id: this.lessons.length + 1,
      ...lessonData,
    };

    this.lessons.push(newLesson);

    return {
      result: true,
      message: '강의가 성공적으로 생성되었습니다.',
      data: newLesson,
    };
  }

  @ApiOperation({ summary: '강의 조회' })
  @ApiQuery({ name: 'category', description: 'Category', required: false })
  @ApiQuery({ name: 'teacher', description: 'Teacher', required: false })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean' },
        data: { $ref: 'Lesson' }, // Assuming 'Lesson' schema is defined in Swagger configuration of your service
        message: { type: 'string' },
      },
    },
  })
  @Get('search')
  getLessons(
    @Query('category') category: string,
    @Query('teacher') teacher: string,
  ): { result: boolean; data: Lesson[]; message: string } {
    let filteredLessons = this.lessons;

    // 카테고리로 필터링
    if (category) {
      filteredLessons = filteredLessons.filter((lesson) =>
        lesson.category.toLowerCase().includes(category.toLowerCase()),
      );
    }

    // 강사명으로 필터링
    if (teacher) {
      filteredLessons = filteredLessons.filter((lesson) =>
        lesson.teacher.toLowerCase().includes(teacher.toLowerCase()),
      );
    }

    return {
      result: true,
      message: '강의를 검색 및 필터링합니다.',
      data: filteredLessons,
    };
  }
}
