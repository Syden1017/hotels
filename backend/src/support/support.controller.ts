import { Controller, Post, Body, Get } from '@nestjs/common';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('message')
  async sendMessage(@Body() body: { userId: string; content: string }) {
    const message = await this.supportService.sendMessage(
      body.userId,
      body.content,
    );
    return {
      id: message._id,
      content: message.content,
      timestamp: message.timestamp,
    };
  }

  @Get('messages')
  async getMessages() {
    return this.supportService.getMessages();
  }
}
