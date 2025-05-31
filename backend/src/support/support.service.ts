import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SupportRequest } from './schemas/support-request.schema';
import { Message } from './schemas/message.schema';
import {
  CreateSupportRequestDto,
  SendMessageDto,
  MarkMessagesAsReadDto,
  GetChatListParams,
} from './dto/support.dto';
import { EventEmitter } from 'stream';

@Injectable()
export class SupportRequestService {
  private readonly eventEmitter = new EventEmitter();

  constructor(
    @InjectModel(SupportRequest.name)
    public supportRequestModel: Model<SupportRequest>,
  ) {}

  async findSupportRequests(
    params: GetChatListParams,
  ): Promise<SupportRequest[]> {
    return this.supportRequestModel.find(params).exec();
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const supportRequest = await this.supportRequestModel.findById(
      data.supportRequest,
    );

    const message = {
      author: data.author,
      sentAt: new Date(),
      text: data.text,
    };

    supportRequest?.messages.push(message);
    await supportRequest?.save();

    this.eventEmitter.emit('messageSent', supportRequest, message);
    return message;
  }

  async getMessages(supportRequestId: string): Promise<Message[]> {
    const supportRequest =
      await this.supportRequestModel.findById(supportRequestId);

    if (!supportRequest) {
      throw new Error(`Support request with ID ${supportRequestId} not found`);
    }

    return supportRequest?.messages;
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    this.eventEmitter.on('messageSent', handler);
    return () => this.eventEmitter.off('messageSent', handler);
  }
}

@Injectable()
export class SupportRequestClientService {
  constructor(private supportRequestService: SupportRequestService) {}

  async createSupportRequest(
    data: CreateSupportRequestDto,
  ): Promise<SupportRequest> {
    const newRequest = new this.supportRequestService.supportRequestModel({
      user: data.user,
      createdAt: new Date(),
      messages: [],
    });
    return newRequest.save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const supportRequest =
      await this.supportRequestService.supportRequestModel.findById(
        params.supportRequest,
      );
    supportRequest?.messages.forEach((message) => {
      if (!message.readAt && message.author !== params.user) {
        message.readAt = new Date();
      }
    });
    await supportRequest?.save();
  }

  async getUnreadCount(supportRequestId: string): Promise<number> {
    const supportRequest =
      await this.supportRequestService.supportRequestModel.findById(
        supportRequestId,
      );

    if (!supportRequest) {
      throw new Error(`Support request with ID ${supportRequestId} not found`);
    }

    return supportRequest?.messages.filter(
      (message) => !message.readAt && message.author !== supportRequest?.user,
    ).length;
  }
}

@Injectable()
export class SupportRequestEmployeeService {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const supportRequest =
      await this.supportRequestService.supportRequestModel.findById(
        params.supportRequest,
      );
    supportRequest?.messages.forEach((message) => {
      if (!message.readAt && message.author === params.user) {
        message.readAt = new Date();
      }
    });
    await supportRequest?.save();
  }

  async getUnreadCount(supportRequestId: string): Promise<number> {
    const supportRequest =
      await this.supportRequestService.supportRequestModel.findById(
        supportRequestId,
      );

    if (!supportRequest) {
      throw new Error(`Support request with ID ${supportRequestId} not found`);
    }

    return supportRequest?.messages.filter(
      (message) => !message.readAt && message.author === supportRequest.user,
    ).length;
  }

  async closeRequest(supportRequestId: string): Promise<void> {
    const supportRequest =
      await this.supportRequestService.supportRequestModel.findById(
        supportRequestId,
      );

    if (!supportRequest) {
      throw new Error(`Support request with ID ${supportRequestId} not found`);
    }

    supportRequest.isActive = false;
    await supportRequest?.save();
  }
}
