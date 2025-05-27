import { Controller, Post, Body, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(
    @Body()
    body: {
      userId: string;
      hotelId: string;
      roomId: string;
      checkInDate: Date;
      checkOutDate: Date;
    },
  ) {
    const booking = await this.bookingsService.createBooking(
      body.userId,
      body.hotelId,
      body.roomId,
      body.checkInDate,
      body.checkOutDate,
    );
    return {
      id: booking._id,
      userId: booking.userId,
      hotelId: booking.hotelId,
    };
  }

  @Get()
  async getAllBookings() {
    return this.bookingsService.findAll();
  }
}
