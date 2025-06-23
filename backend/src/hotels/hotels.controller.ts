import { Controller, Get, Query, Param } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { SearchHotelParams } from './interfaces/hotel.interface';
import { Types } from 'mongoose';

@Controller('api/common/hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async search(@Query() params: SearchHotelParams) {
    return this.hotelService.search(params);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.hotelService.findById(new Types.ObjectId(id));
  }
}
