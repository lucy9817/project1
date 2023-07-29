/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Board, BoardModel } from './interface/board.interface';
import { GetBoardDto } from './dto/get-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardModule } from './board.module';

@ApiTags('boards')
@Controller('board')
export class BoardController {
  private boards: Board[] = [];

  @ApiOperation({ summary: '글 작성' })
  @ApiBody({ type: CreateBoardDto })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: BoardModel,
  })
  
  @Post()
  createPost(@Body() Board: CreateBoardDto): Board {
    const newBoard: Board = {
      id: uuidv4(),
      title: Board.title,
      personal: Board.personal,
      category: Board.category,
      tag: Board.tag,
      contents: Board.contents,
      price: Board.price,
    };

    this.boards.push(newBoard);

    return newBoard;
  }

  @ApiOperation({ summary: '글 조회' })
  @ApiResponse({ status: 200, description: 'Success', type: [BoardModel] })
  @Get()
  getPosts(@Query() filterData: GetBoardDto): Board[] {
    // 필터링, 정렬, 페이징 기능을 구현할 위치
    return this.boards;
  }

  @ApiOperation({ summary: '글 수정' })
  @ApiParam({ name: 'id', description: 'Board ID', type: String })
  @ApiBody({ type: CreateBoardDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: BoardModel,
  })
  @ApiNotFoundResponse({ description: 'Board not found' })
  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body() updatedData: CreateBoardDto,
  ): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException('해당 ID의 글을 찾을 수 없습니다.');
    }

    board.title = updatedData.title ?? board.title;
    board.personal = updatedData.personal ?? board.personal;
    board.category = updatedData.category ?? board.category;
    board.tag = updatedData.tag ?? board.tag;
    board.contents = updatedData.contents ?? board.contents;
    board.price = updatedData.price ?? board.price;

    return board;
  }

  @ApiOperation({ summary: '글 삭제' })
  @ApiParam({ name: 'id', description: 'Board ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: BoardModel,
  })
  @ApiNotFoundResponse({ description: 'Board not found' })
  @Delete(':id')
  deletePost(@Param('id') id: string): void {
    const boardIndex = this.boards.findIndex((board) => board.id === id);

    if (boardIndex === -1) {
      throw new NotFoundException('해당 ID의 글을 찾을 수 없습니다.');
    }

    this.boards.splice(boardIndex, 1);
  }
}
