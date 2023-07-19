import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMeet(): string {
    return 'Hello World!';
  }
}
