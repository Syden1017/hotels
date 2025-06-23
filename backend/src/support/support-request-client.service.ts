import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SupportRequest } from './schemas/support-request.schema';
import {
  CreateSupportRequestDto,
  ISupportRequestClientService,
  MarkMessagesAsReadDto,
} from './interfaces/support.interface';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
  ) {}

  async createSupportRequest(
    data: CreateSupportRequestDto,
  ): Promise<SupportRequest> {
    const newRequest = new this.supportRequestModel({
      user: data.user,
      messages: [
        {
          _id: new Types.ObjectId(),
          author: data.user,
          sentAt: new Date(),
          text: data.text,
        },
      ],
      isActive: true,
    });
    return newRequest.save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    await this.supportRequestModel
      .updateOne(
        {
          _id: params.supportRequest,
          'messages.author': { $ne: params.user },
          'messages.readAt': { $exists: false },
          'messages.sentAt': { $lt: params.createdBefore },
        },
        {
          $set: { 'messages.$[elem].readAt': new Date() },
        },
        {
          arrayFilters: [
            {
              'elem.author': { $ne: params.user },
              'elem.readAt': { $exists: false },
              'elem.sentAt': { $lt: params.createdBefore },
            },
          ],
        },
      )
      .exec();
  }

  async getUnreadCount(supportRequest: Types.ObjectId): Promise<number> {
    const request = await this.supportRequestModel
      .findById(supportRequest)
      .exec();
    return (
      request?.messages.filter(
        (m) => m.author.toString() !== request.user.toString() && !m.readAt,
      ).length || 0
    );
  }
}
