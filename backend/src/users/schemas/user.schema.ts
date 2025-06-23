import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  Client = 'client',
  Admin = 'admin',
  Manager = 'manager',
}

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.Client })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
