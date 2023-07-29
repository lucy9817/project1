import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Lesson } from './interface/lesson.interface';
import { LessonService } from './lesson.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ApiOperation } from '@nestjs/swagger';
import { SearchLessonsDto } from './dto/search-lesson.dto';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Get(':id')
  @ApiOperation({ summary: '강의 단 건 상세 조회', tags: ['lesson'] })
  async getLessonDetail(@Param('id') id: number): Promise<ResponseDto<Lesson>> {
    const lessonDetail = await this.lessonService.findOne(id);

    if (!lessonDetail) {
      return {
        result: false,
        message: '해당 ID의 강의 상세 정보를 찾을 수 없습니다.',
      };
    }

    return {
      result: true,
      data: lessonDetail,
    };
  }

  @Post('search')
  @ApiOperation({ summary: '강의 목록 조회', tags: ['lesson'] })
  async searchLessons(
    @Body() searchLessonsDto: SearchLessonsDto,
  ): Promise<ResponseDto<Lesson[]>> {
    const filteredLessons = await this.lessonService.search(searchLessonsDto);
    return {
      result: true,
      data: filteredLessons,
    };
  }
}
