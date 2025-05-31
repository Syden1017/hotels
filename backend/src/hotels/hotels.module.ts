import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';
import { HotelsController } from './hotels.controller';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoomController } from './hotel-room.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [HotelsService, HotelRoomService],
  controllers: [HotelsController, HotelRoomController],
  exports: [HotelsService, HotelRoomService],
})
export class HotelsModule {}
