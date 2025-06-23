import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import {
  IHotelService,
  SearchHotelParams,
  UpdateHotelParams,
} from './interfaces/hotel.interface';

@Injectable()
export class HotelService implements IHotelService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  async create(data: any): Promise<Hotel> {
    const hotel = new this.hotelModel(data);
    return hotel.save();
  }

  async findById(id: Types.ObjectId): Promise<Hotel | null> {
    return this.hotelModel.findById(id).exec();
  }

  async search(params: SearchHotelParams): Promise<Hotel[]> {
    const { limit, offset, title } = params;
    const query: any = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    return this.hotelModel.find(query).skip(offset).limit(limit).exec();
  }

  async update(
    id: Types.ObjectId,
    data: UpdateHotelParams,
  ): Promise<Hotel | null> {
    return this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
