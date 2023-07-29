import { Controller, Get, Query } from '@nestjs/common';
import { PopularService } from './popular.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('popular') // 컨트롤러에 대한 태그 지정
@Controller('popular')
export class PopularController {
  constructor(private readonly popularService: PopularService) {}

  @ApiOperation({ summary: '선생님 목록 조회', description: '카테고리별 또는 정렬 순서에 따른 선생님 목록을 조회합니다.' })
  @ApiQuery({ name: 'category', description: '선생님 카테고리', required: false })
  @ApiQuery({ name: 'sortBy', description: '정렬 순서 (popular, recommended, distance)', required: false })
  @ApiResponse({
    status: 200,
    description: '성공',
    isArray: true, // 반환값이 배열인 경우
    type: 'object',
    schema: {
      example: [
        {
          lessonComment: '수업 코멘트',
          lessonExplain: '수업 설명',
          lessonTeacher: '선생님 이름',
          lessonScore: 4.2,
          lessonDistance: '선생님과의 거리',
        },
      ],
      properties: {
        lessonComment: { type: 'string', description: '수업 코멘트' },
        lessonExplain: { type: 'string', description: '수업 설명' },
        lessonTeacher: { type: 'string', description: '선생님 이름' },
        lessonScore: { type: 'number', description: '선생님 평점' },
        lessonDistance: { type: 'string', description: '선생님과의 거리' },
      },
    },
  })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @Get()
  async getTeachers(
    @Query('category') category: string,
    @Query('sortBy') sortBy: string,
  ): Promise<any[]> {
    if (category) {
      // 카테고리별로 선생님 목록을 가져오기 위해 카테고리에 해당하는 선생님 필터링
      return this.popularService.getTeachersByCategory(category);
    } else if (sortBy) {
      // 거리순, 인기순, 추천순으로 선생님 목록을 가져오기 위해 정렬
      return this.popularService.getTeachersBySortOrder(sortBy);
    } else {
      return [];
    }
  }
}
