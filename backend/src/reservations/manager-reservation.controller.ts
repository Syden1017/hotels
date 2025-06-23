import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { RolesGuard } from '../auth/roles.guard';
import { Types } from 'mongoose';

@Controller('manager/reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Manager, UserRole.Admin)
export class ManagerReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.reservationService.getReservations({
      userId: new Types.ObjectId(userId),
    });
  }
}
