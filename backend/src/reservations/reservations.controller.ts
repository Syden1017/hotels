import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservations.service';
import {
  ReservationDto,
  ReservationSearchOptions,
} from './interfaces/reservation.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Types } from 'mongoose';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: ReservationDto) {
    return this.reservationService.addReservation(data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.reservationService.removeReservation(new Types.ObjectId(id));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() filter: ReservationSearchOptions) {
    return this.reservationService.getReservations(filter);
  }
}
