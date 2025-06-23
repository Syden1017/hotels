import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../users/schemas/user.schema';
import { ReservationDto } from './interfaces/reservation.interface';
import { Types } from 'mongoose';

@Controller('client/reservations')
@UseGuards(JwtAuthGuard)
export class ClientReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(
    @Body() data: Omit<ReservationDto, 'userId'>,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.reservationService.addReservation({
      ...data,
      userId: user._id,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    const reservation = await this.reservationService.getReservationById(
      new Types.ObjectId(id),
    );

    if (reservation.userId.toString() !== user._id.toString()) {
      throw new ForbiddenException('Нельзя удалить чужое бронирование');
    }

    return this.reservationService.removeReservation(new Types.ObjectId(id));
  }

  @Get()
  async findAll(@Req() req: Request) {
    const user = req.user as User;
    return this.reservationService.getReservations({
      userId: user._id,
    });
  }
}
