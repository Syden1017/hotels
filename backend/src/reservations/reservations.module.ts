import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from './reservations.controller';
import { ClientReservationController } from './client-reservation.controller';
import { ManagerReservationController } from './manager-reservation.controller';
import { ReservationService } from './reservations.service';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [
    ReservationController,
    ClientReservationController,
    ManagerReservationController,
  ],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
