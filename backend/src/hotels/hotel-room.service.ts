import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HotelRoom } from './schemas/hotel-room.schema';
import {
  IHotelRoomService,
  SearchRoomsParams,
} from './interfaces/hotel.interface';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name) private hotelRoomModel: Model<HotelRoom>,
  ) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const room = new this.hotelRoomModel(data);
    return room.save();
  }

  async findById(id: Types.ObjectId): Promise<HotelRoom | null> {
    return this.hotelRoomModel.findById(id).exec();
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { limit, offset, hotel, isEnabled } = params;
    const query: any = { hotel };

    if (isEnabled !== undefined) {
      query.isEnabled = isEnabled;
    }

    return this.hotelRoomModel.find(query).skip(offset).limit(limit).exec();
  }

  async update(
    id: Types.ObjectId,
    data: Partial<HotelRoom>,
  ): Promise<HotelRoom | null> {
    return this.hotelRoomModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }
}
