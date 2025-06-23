import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SupportRequest } from './schemas/support-request.schema';
import {
  ISupportRequestEmployeeService,
  MarkMessagesAsReadDto,
} from './interfaces/support.interface';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
  ) {}

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    await this.supportRequestModel
      .updateOne(
        {
          _id: params.supportRequest,
          'messages.author': params.user,
          'messages.readAt': { $exists: false },
          'messages.sentAt': { $lt: params.createdBefore },
        },
        {
          $set: { 'messages.$[elem].readAt': new Date() },
        },
        {
          arrayFilters: [
            {
              'elem.author': params.user,
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
        (m) => m.author.toString() === request.user.toString() && !m.readAt,
      ).length || 0
    );
  }

  async closeRequest(supportRequest: Types.ObjectId): Promise<void> {
    await this.supportRequestModel
      .findByIdAndUpdate(supportRequest, { isActive: false })
      .exec();
  }
}
