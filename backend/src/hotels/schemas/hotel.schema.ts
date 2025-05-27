import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ type: Types.ObjectId, required: true, unique: true, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Date, required: true, default: () => new Date() })
  createdAt: Date;

  @Prop({ type: Date, required: true, default: () => new Date() })
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
