import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBoardDto {
  @ApiProperty({ required: false, description: '검색할 제목' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, description: '검색할 카테고리' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false, description: '검색할 태그' })
  @IsOptional()
  @IsString()
  tag?: string;
}
