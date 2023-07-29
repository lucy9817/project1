import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService], // 다른 모듈에서 UserService를 주입받아 사용할 수 있도록 exports에 등록
})
export class BoardModule {}


