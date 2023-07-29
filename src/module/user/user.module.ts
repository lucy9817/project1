import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './uesr.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 다른 모듈에서 UserService를 주입받아 사용할 수 있도록 exports에 등록
})
export class UserModule {}
