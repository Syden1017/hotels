import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Reservations extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  hotelId: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  dateStart: Date;

  @Prop({ required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservations);
