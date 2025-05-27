import { Types } from 'mongoose';

export interface IHotelRoom {
  _id: Types.ObjectId;
  hotel: Types.ObjectId;
  description?: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
}
