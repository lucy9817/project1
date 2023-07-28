/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { TalentList } from './talent-list.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('talent-list')
@ApiTags('talent-list')
export class TalentListController {
  private lists = [
    { id: 1, name: 'music' },
    { id: 2, name: 'art' },
    { id: 3, name: 'math' },
    { id: 4, name: 'sport' },
    // more entries....
  ];

  @Get()
  @ApiOperation({
    summary: '재능 카테고리 리스트 조회',
    description: '홈화면에 표시할 재능 카테고리 목록을 조회합니다.',
  })
  @ApiQuery({
    name: 'category',
    type: 'string',
    required: false,
    description: '카테고리 이름으로 필터링합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 재능 카테고리 목록을 조회했습니다.',
    type: TalentList,
  })
  getList(@Query('category') category?: string): {
    result: boolean;
    data: TalentList[];
    message: string;
  } {
    let filteredLists = this.lists;

    // 카테고리가 존재하는 경우 해당 카테고리로 필터링
    if (category) {
      filteredLists = filteredLists.filter(
        (item) => item.name.toLowerCase() === category.toLowerCase(),
      );
    }

    return {
      result: true,
      message: '재능 카테고리 목록을 조회합니다.',
      data: filteredLists,
    };
  }
}
