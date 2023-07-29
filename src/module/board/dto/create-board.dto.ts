import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ description: '글 제목' })
  title?: string;

  @ApiProperty({ description: '인원 수' })
  personal?: number;

  @ApiProperty({ description: '카테고리' })
  category?: string;

  @ApiProperty({ description: '태그' })
  tag?: string;

  @ApiProperty({ description: '글 본문' })
  contents?: string;

  @ApiProperty({ description: '가격' })
  price?: number;
}
