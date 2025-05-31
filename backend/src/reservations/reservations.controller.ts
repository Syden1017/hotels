import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationDto } from './dto/reservations.dto';
import { ReservationSearchOptions } from './interfaces/reservations.interface';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Post()
  async addReservation(@Body() data: ReservationDto) {
    return this.reservationService.addReservation(data);
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string) {
    return this.reservationService.removeReservation(id);
  }

  @Get()
  async getReservations(@Body() filter: ReservationSearchOptions) {
    return this.reservationService.getReservations(filter);
  }
}
