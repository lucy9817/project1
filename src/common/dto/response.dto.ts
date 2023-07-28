/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ description: '성공 여부' })
  result: boolean;

  @ApiProperty({ description: '에러 메시지' })
  message?: string = '';

  @ApiProperty({ description: '데이터' })
  data?: T;
}
