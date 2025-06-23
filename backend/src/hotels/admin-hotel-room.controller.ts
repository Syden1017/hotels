import { Controller, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { RolesGuard } from '../auth/roles.guard';
import { Types } from 'mongoose';

@Controller('api/admin/hotel-rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
export class AdminHotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  async create(
    @Body()
    data: {
      hotel: string;
      description?: string;
      images?: string[];
      isEnabled?: boolean;
    },
  ) {
    return this.hotelRoomService.create({
      ...data,
      hotel: new Types.ObjectId(data.hotel),
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: {
      description?: string;
      images?: string[];
      isEnabled?: boolean;
    },
  ) {
    return this.hotelRoomService.update(new Types.ObjectId(id), data);
  }
}
