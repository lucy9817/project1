import { Injectable } from '@nestjs/common';
import { Board } from './interface/board.interface';

@Injectable()
export class BoardService {
  private readonly boards: Board[] = []; // 게시글을 저장할 배열 또는 데이터베이스와 연동하여 사용할 수 있습니다.

  createBoard(newBoard: Board): void {
    this.boards.push(newBoard);
    // 데이터베이스와 연동하는 경우 해당 데이터를 데이터베이스에 저장하는 로직을 추가합니다.
  }

  getAllBoards(): Board[] {
    return this.boards;
    // 데이터베이스와 연동하는 경우 저장된 모든 게시글을 조회하는 로직을 추가합니다.
  }

  getBoardById(id: string): Board | undefined {
    return this.boards.find((board) => board.id === id);
    // 데이터베이스와 연동하는 경우 해당 id를 가진 게시글을 조회하는 로직을 추가합니다.
  }

  // 기타 필요한 메소드들을 추가할 수 있습니다.
}
