import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateHotelDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;
}
