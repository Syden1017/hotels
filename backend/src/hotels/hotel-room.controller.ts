import { Controller, Get, Query, Param } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { SearchRoomsParams } from './interfaces/hotel.interface';
import { Types } from 'mongoose';

@Controller('api/common/hotel-rooms')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Get()
  async search(@Query() params: SearchRoomsParams) {
    return this.hotelRoomService.search({
      ...params,
      hotel: new Types.ObjectId(params.hotel),
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.hotelRoomService.findById(new Types.ObjectId(id));
  }
}
