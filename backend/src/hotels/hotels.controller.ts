import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  async getAllHotels() {
    return this.hotelsService.findAllHotels();
  }

  @Get(':id')
  async getHotelById(@Param('id') id: string) {
    return this.hotelsService.findHotelById(id);
  }

  @Post()
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    const { title, createdAt, updatedAt } = createHotelDto;
    return this.hotelsService.createHotel(title, createdAt, updatedAt);
  }

  @Post(':hotelId/rooms')
  async createRoom(
    @Param('hotelId') hotelId: string,
    @Body() createRoomDto: CreateHotelRoomDto,
  ) {
    const { description, images, createdAt, updatedAt } = createRoomDto;
    return this.hotelsService.createHotelRoom(
      hotelId,
      createdAt,
      updatedAt,
      images,
      description,
    );
  }

  @Patch('rooms/:roomId/enable')
  async enableRoom(@Param('roomId') roomId: string) {
    return this.hotelsService.enableRoom(roomId);
  }

  @Patch('rooms/:roomId/disable')
  async disableRoom(@Param('roomId') roomId: string) {
    return this.hotelsService.disableRoom(roomId);
  }
}
