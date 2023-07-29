import { ApiProperty } from '@nestjs/swagger';

export class SearchLessonsDto {
  @ApiProperty({ description: '카테고리' })
  category?: string;

  @ApiProperty({ description: '선생님' })
  teacher?: string;

  @ApiProperty({ description: '검색 limit', default: 0 })
  limit?: number = 0;

  @ApiProperty({ description: '검색 offset', default: 10 })
  offest?: number = 10;
}
