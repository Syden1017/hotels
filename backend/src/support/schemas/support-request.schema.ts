import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Document } from 'mongoose';

@Schema()
export class SupportRequest extends Document {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ default: [] })
  messages: Message[];

  @Prop()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
