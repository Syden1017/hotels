import { ReservationDto } from '../dto/reservations.dto';
import { Reservations } from '../schemas/reservations.schema';

export interface ReservationSearchOptions {
  userId: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface IReservation {
  addReservation(data: ReservationDto): Promise<Reservations>;
  removeReservation(id: string): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservations>>;
}
