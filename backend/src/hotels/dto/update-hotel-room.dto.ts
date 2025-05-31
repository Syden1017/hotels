import { IsString, IsBoolean } from 'class-validator';

export class UpdateHotelRoomDto {
  @IsString()
  description: string;

  @IsString()
  hotelId: string;

  @IsBoolean()
  isEnabled: boolean;

  images?: string[];
}
