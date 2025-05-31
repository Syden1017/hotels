import { Injectable } from '@nestjs/common';
import {
  IReservation,
  ReservationSearchOptions,
} from './interfaces/reservations.interface';
import { Reservations } from './schemas/reservations.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationDto } from './dto/reservations.dto';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsService implements IReservation {
  constructor(
    @InjectModel(Reservations.name)
    private reservationModel: Model<Reservations>,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservations> {
    const existingReservations = await this.reservationModel.find({
      roomId: data.roomId,
      $or: [
        { dateStart: { $lt: data.dateEnd, $gte: data.dateStart } },
        { dateEnd: { $gt: data.dateStart, $lte: data.dateEnd } },
      ],
    });

    if (existingReservations.length > 0) {
      throw new Error('Room is not available for the selected dates');
    }

    const newReservation = new this.reservationModel(data);
    return newReservation.save();
  }

  async removeReservation(id: string): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id);
  }

  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservations>> {
    return this.reservationModel.find(filter).exec();
  }
}
