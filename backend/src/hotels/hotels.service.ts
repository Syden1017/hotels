import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import {
  SearchHotelParams,
  UpdateHotelParams,
} from './interfaces/hotel.interface';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  async create(data: Date): Promise<Hotel> {
    const hotel = new this.hotelModel(data);
    return hotel.save();
  }

  async findById(id: string): Promise<Hotel | null> {
    return this.hotelModel.findById(id).exec();
  }

  async search(params: SearchHotelParams): Promise<Hotel[]> {
    const { limit, offset, title } = params;
    return this.hotelModel
      .find({ title: new RegExp(title, 'i') })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async update(id: string, data: UpdateHotelParams): Promise<Hotel | null> {
    return this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async findAll(params: { limit?: number; offset?: number }): Promise<Hotel[]> {
    const { limit = 10, offset = 0 } = params;
    return this.hotelModel.find().skip(offset).limit(limit).exec();
  }
}
