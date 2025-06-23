import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelController } from './hotels.controller';
import { HotelRoomController } from './hotel-room.controller';
import { AdminHotelController } from './admin-hotel.controller';
import { AdminHotelRoomController } from './admin-hotel-room.controller';
import { HotelService } from './hotels.service';
import { HotelRoomService } from './hotel-room.service';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [
    HotelController,
    HotelRoomController,
    AdminHotelController,
    AdminHotelRoomController,
  ],
  providers: [HotelService, HotelRoomService],
  exports: [HotelService, HotelRoomService],
})
export class HotelModule {}
