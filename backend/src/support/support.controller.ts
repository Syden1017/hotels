import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { SupportRequestClientService } from './support-request-client.service';
import { SupportRequestEmployeeService } from './support-request-employee.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/user-role.enum';
import {
  GetChatListParams,
  CreateSupportRequestDto,
  SendMessageDto,
  MarkMessagesAsReadDto,
} from './interfaces/support.interface';

@Controller('support')
export class SupportController {
  constructor(
    private supportRequestService: SupportRequestService,
    private supportRequestClientService: SupportRequestClientService,
    private supportRequestEmployeeService: SupportRequestEmployeeService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Manager)
  async getSupportRequests(@Query() params: GetChatListParams) {
    return this.supportRequestService.findSupportRequests(params);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSupportRequest(@Body() data: CreateSupportRequestDto) {
    return this.supportRequestClientService.createSupportRequest(data);
  }

  @Post(':id/messages')
  @UseGuards(JwtAuthGuard)
  async sendMessage(@Param('id') id: string, @Body() data: SendMessageDto) {
    return this.supportRequestService.sendMessage({
      ...data,
      supportRequest: id,
    });
  }

  @Get(':id/messages')
  @UseGuards(JwtAuthGuard)
  async getMessages(@Param('id') id: string) {
    return this.supportRequestService.getMessages(id);
  }

  @Post(':id/messages/read')
  @UseGuards(JwtAuthGuard)
  async markMessagesAsRead(
    @Param('id') id: string,
    @Body() data: MarkMessagesAsReadDto,
  ) {
    if (data.user) {
      return this.supportRequestClientService.markMessagesAsRead({
        ...data,
        supportRequest: id,
      });
    }
  }

  @Get(':id/unread-count')
  @UseGuards(JwtAuthGuard)
  async getUnreadCount(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    if (userId) {
      return this.supportRequestClientService.getUnreadCount(id);
    }
    return this.supportRequestEmployeeService.getUnreadCount(id);
  }

  @Post(':id/close')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Manager)
  async closeRequest(@Param('id') id: string) {
    return this.supportRequestEmployeeService.closeRequest(id);
  }
}
