/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';

class PostData {
  @ApiProperty() // Add Swagger decorator for each property
  id: string; // UUID로 변경

  @ApiProperty()
  category: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  hashtag: string;
}


@ApiTags('boards')
@Controller('board')
export class BoardController {
  private posts: PostData[] = [];

  @ApiOperation({ summary: '글 작성' })
  @ApiBody({ type: PostData })
  @ApiResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: { result: true, data: Post , message: '새로운 글이 작성되었습니다.' },
    },
  })
  
  @Post()
  createPost(@Body() postData: PostData): {
    result: boolean;
    data: PostData;
    message: string;
  } {
    const newPost: PostData = {
      id: uuidv4(), // UUID로 생성
      category: postData.category,
      title: postData.title,
      content: postData.content,
      hashtag: postData.hashtag,
    };

    this.posts.push(newPost);

    return {
      result: true,
      message: '새로운 글이 작성되었습니다.',
      data: newPost,
    };
  }

  @ApiOperation({ summary: '글 수정' })
  @ApiParam({ name: 'id', description: 'Post ID', type: String })
  @ApiBody({ type: PostData })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      example: { result: true, data: Post, message: '새로운 글이 작성되었습니다.' },
    },
  })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body() updatedData: PostData,
  ): { result: boolean; data: PostData; message: string } {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('해당 ID의 글을 찾을 수 없습니다.');
    }

    post.category = updatedData.category;
    post.title = updatedData.title;
    post.content = updatedData.content;
    post.hashtag = updatedData.hashtag;

    return { result: true, message: '글이 수정되었습니다.', data: post };
  }

  @ApiOperation({ summary: '글 삭제' })
  @ApiParam({ name: 'id', description: 'Post ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      example: { result: true, message: '새로운 글이 작성되었습니다.' },
    },
  })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @Delete(':id')
  deletePost(@Param('id') id: string): { result: boolean; message: string } {
    const postIndex = this.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      throw new NotFoundException('해당 ID의 글이 삭제되었습니다.');
    }

    this.posts.splice(postIndex, 1);

    return { result: true, message: '글이 삭제되었습니다.' };
  }
}
