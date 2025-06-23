import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SupportRequest } from './schemas/support-request.schema';
import { Message } from './schemas/message.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  GetChatListParams,
  ISupportRequestService,
  SendMessageDto,
} from './interfaces/support.interface';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findSupportRequests(
    params: GetChatListParams,
  ): Promise<SupportRequest[]> {
    const query: any = {};
    if (params.user) {
      query.user = params.user;
    }
    if (params.isActive !== undefined) {
      query.isActive = params.isActive;
    }
    return this.supportRequestModel.find(query).exec();
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const message = {
      author: data.author,
      sentAt: new Date(),
      text: data.text,
    };

    const updatedRequest = await this.supportRequestModel
      .findByIdAndUpdate(
        data.supportRequest,
        { $push: { messages: message } },
        { new: true },
      )
      .exec();

    this.eventEmitter.emit('newMessage', updatedRequest, message);
    return message;
  }

  async getMessages(supportRequest: Types.ObjectId): Promise<Message[]> {
    const request = await this.supportRequestModel
      .findById(supportRequest)
      .exec();
    return request?.messages || [];
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    this.eventEmitter.on('newMessage', handler);
    return () => this.eventEmitter.off('newMessage', handler);
  }
}
