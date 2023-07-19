import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class ApiController {
  constructor(private readonly appService: AppService) {}

  @Get('meet')
  getMeet(): string {
    return this.appService.getMeet();
  }

  @Post('meet')
  postMeet(@Body() data: any): string {
    const name = data.name || 'Anonymous';
    return `반갑습니다, ${name}님!`;
  }

}



