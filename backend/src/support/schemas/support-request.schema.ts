import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Types } from 'mongoose';

@Schema()
export class SupportRequest {
  @Prop({ required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ default: [] })
  messages: Message[];

  @Prop()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
