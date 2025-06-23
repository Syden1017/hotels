import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';
import {
  IReservation,
  ReservationDto,
  ReservationSearchOptions,
} from './interfaces/reservation.interface';

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<Reservation>,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const isAvailable = await this.isRoomAvailable(
      data.roomId,
      data.dateStart,
      data.dateEnd,
    );

    if (!isAvailable) {
      throw new BadRequestException('Номер недоступен на выбранные даты');
    }

    const reservation = new this.reservationModel(data);
    return reservation.save();
  }

  async removeReservation(id: Types.ObjectId): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id).exec();
  }

  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Reservation[]> {
    const query: any = { userId: filter.userId };

    if (filter.dateStart && filter.dateEnd) {
      query.dateStart = { $lte: filter.dateEnd };
      query.dateEnd = { $gte: filter.dateStart };
    }

    return this.reservationModel.find(query).exec();
  }

  async getReservationById(id: Types.ObjectId): Promise<Reservation> {
    const reservation = await this.reservationModel.findById(id).exec();
    if (!reservation) {
      throw new NotFoundException('Бронирование не найдено');
    }
    return reservation;
  }

  private async isRoomAvailable(
    roomId: Types.ObjectId,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<boolean> {
    const overlappingReservations = await this.reservationModel
      .find({
        roomId,
        dateStart: { $lt: dateEnd },
        dateEnd: { $gt: dateStart },
      })
      .exec();

    return overlappingReservations.length === 0;
  }
}
