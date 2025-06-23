import { Controller, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { UpdateHotelParams } from './interfaces/hotel.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { RolesGuard } from '../auth/roles.guard';
import { Types } from 'mongoose';

@Controller('api/admin/hotels')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
export class AdminHotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  async create(@Body() data: { title: string; description?: string }) {
    return this.hotelService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateHotelParams) {
    return this.hotelService.update(new Types.ObjectId(id), data);
  }
}
