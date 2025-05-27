import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async createBooking(
    userId: string,
    hotelId: string,
    roomId: string,
    checkInDate: Date,
    checkOutDate: Date,
  ): Promise<Booking> {
    const createdBooking = new this.bookingModel({
      userId,
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
    });
    return createdBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }
}
