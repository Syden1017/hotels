import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Message {
  @Prop({ required: true })
  author: Types.ObjectId;

  @Prop({ required: true, default: Date.now })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop()
  readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
