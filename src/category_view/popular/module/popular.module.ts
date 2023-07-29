import { Module } from '@nestjs/common';
import { PopularController } from '../popular.controller';
import { PopularService } from '../popular.service';

@Module({
  controllers: [PopularController],
  providers: [PopularService], // PopularService를 providers에 등록
})
export class PopularModule {}
