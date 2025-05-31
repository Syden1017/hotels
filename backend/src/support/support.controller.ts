import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import {
  SupportRequestClientService,
  SupportRequestEmployeeService,
} from './support.service';
import {
  CreateSupportRequestDto,
  SendMessageDto,
  MarkMessagesAsReadDto,
} from './dto/support.dto';

@Controller('support-requests')
export class SupportRequestController {
  constructor(
    private readonly clientService: SupportRequestClientService,
    private readonly employeeService: SupportRequestEmployeeService,
  ) {}

  @Post()
  async createSupportRequest(
    @Body() createSupportRequestDto: CreateSupportRequestDto,
  ) {
    return this.clientService.createSupportRequest(createSupportRequestDto);
  }

  @Get(':id/messages')
  async getMessages(@Param('id') supportRequestId: string) {
    const messages = await this.clientService.getMessages(supportRequestId);
    if (!messages) {
      throw new NotFoundException(
        `Messages for support request with ID ${supportRequestId} not found.`,
      );
    }
    return messages;
  }

  @Post(':id/messages')
  async sendMessage(
    @Param('id') supportRequestId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    sendMessageDto.supportRequest = supportRequestId;
    const result = await this.clientService.sendMessage(sendMessageDto);
    return result;
  }

  @Post(':id/read')
  async markMessagesAsRead(
    @Param('id') supportRequestId: string,
    @Body() markMessagesAsReadDto: MarkMessagesAsReadDto,
  ) {
    markMessagesAsReadDto.supportRequest = supportRequestId;
    await this.employeeService.markMessagesAsRead(markMessagesAsReadDto);
  }
}
