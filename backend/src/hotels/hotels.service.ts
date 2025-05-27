import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import { HotelRoom } from './schemas/hotel-room.schema';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
    @InjectModel(HotelRoom.name) private hotelRoomModel: Model<HotelRoom>,
  ) {}

  async createHotel(
    title: string,
    createdAt: Date,
    updatedAt: Date,
    description?: string,
  ): Promise<Hotel> {
    const newHotel = new this.hotelModel({
      title,
      createdAt,
      updatedAt,
      description,
    });
    return newHotel.save();
  }

  async findAllHotels(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  async findHotelById(id: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return hotel;
  }

  async createHotelRoom(
    hotelId: string,
    createdAt: Date,
    updatedAt: Date,
    images: string[] = [],
    description?: string,
  ): Promise<HotelRoom> {
    const hotel = await this.findHotelById(hotelId);

    const newRoom = new this.hotelRoomModel({
      hotel: hotel._id,
      description,
      createdAt,
      updatedAt,
      images,
      isEnabled: true,
    });

    return newRoom.save();
  }

  async findRoomsByHotel(hotelId: string): Promise<HotelRoom[]> {
    return this.hotelRoomModel.find({ hotel: hotelId }).exec();
  }

  async enableRoom(roomId: string): Promise<HotelRoom> {
    const room = await this.hotelRoomModel.findById(roomId);
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }
    room.isEnabled = true;
    return room.save();
  }

  async disableRoom(roomId: string): Promise<HotelRoom> {
    const room = await this.hotelRoomModel.findById(roomId);
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }
    room.isEnabled = false;
    return room.save();
  }
}
