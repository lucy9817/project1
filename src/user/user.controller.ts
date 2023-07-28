/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { User } from './user.interface';

export class UserModel implements User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Controller('users')
@ApiTags('users')
export class UserController {
  private users: User[] = [
    {
      id: 1,
      name: 'Sarah park',
      email: 'sahra@example.com',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane lee',
      email: 'jane@example.com',
      password: 'password456',
    },
    // 다른 사용자 데이터들
  ];

  @Get(':id')
  @ApiOperation({
    summary: '사용자 프로필 조회',
    description: '주어진 ID에 해당하는 사용자의 프로필 정보를 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 사용자 프로필을 조회했습니다.',
    type: UserModel,
  })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 사용자를 찾을 수 없습니다.',
  })
  getUserProfile(@Param('id') userId: number): User {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new NotFoundException('해당 ID의 사용자를 찾을 수 없습니다.');
    }

    return user;
  }

  @Put(':id')
  @ApiOperation({
    summary: '사용자 프로필 업데이트',
    description: '주어진 ID에 해당하는 사용자의 프로필 정보를 업데이트합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID', type: 'number' })
  @ApiBody({ type: UserModel, description: '업데이트할 사용자 정보' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 사용자 프로필을 업데이트했습니다.',
    type: UserModel,
  })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 사용자를 찾을 수 없습니다.',
  })
  updateUserProfile(
    @Param('id') userId: number,
    @Body() updatedUserData: User,
  ): User {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new NotFoundException('해당 ID의 사용자를 찾을 수 없습니다.');
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      name: updatedUserData.name,
      email: updatedUserData.email,
      password: updatedUserData.password,
      // 다른 사용자 정보 업데이트
    };

    return this.users[userIndex];
  }

  @Delete(':id')
  @ApiOperation({
    summary: '사용자 프로필 삭제',
    description: '주어진 ID에 해당하는 사용자의 프로필 정보를 삭제합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 사용자 프로필을 삭제했습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 사용자를 찾을 수 없습니다.',
  })
  deleteUserProfile(@Param('id') userId: number): void {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new NotFoundException('해당 ID의 사용자를 찾을 수 없습니다.');
    }

    this.users.splice(userIndex, 1);
  }

  @Post(':id/lessons/:lessonId/cancel')
  @ApiOperation({
    summary: '강의 참여 취소',
    description: '사용자가 강의 참여를 취소합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID', type: 'number' })
  @ApiParam({ name: 'lessonId', description: '강의 ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 강의 참여를 취소했습니다.',
  })
  cancelLessonParticipation(
    @Param('id') _userId: number,
    @Param('lessonId') _lessonId: number,
  ): void {
    // 사용자가 강의 취소하는 로직 구현
  }

  @Post(':id/lessons/:lessonId/participate')
  @ApiOperation({
    summary: '강의 참여',
    description: '사용자가 강의에 참여합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID', type: 'number' })
  @ApiParam({ name: 'lessonId', description: '강의 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '성공적으로 강의에 참여했습니다.' })
  participateInLesson(
    @Param('id') _userId: number,
    @Param('lessonId') _lessonId: number,
  ): void {
    // 사용자가 강의에 참여하는 로직 구현
  }

  @Delete(':id/withdraw')
  @ApiOperation({
    summary: '회원 탈퇴',
    description: '사용자가 회원 탈퇴합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '성공적으로 회원 탈퇴했습니다.' })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 사용자를 찾을 수 없습니다.',
  })
  withdrawUser(@Param('id') _userId: number): void {
    // 사용자가 회원 탈퇴하는 로직 구현
  }
}
