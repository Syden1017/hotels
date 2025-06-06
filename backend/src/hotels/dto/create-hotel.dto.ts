import { IsString, IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;
}
