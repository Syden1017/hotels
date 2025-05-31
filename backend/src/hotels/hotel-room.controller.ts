import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { SearchRoomsParams } from './interfaces/hotel-room.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/common/hotel-rooms')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: Partial<any>) {
    return this.hotelRoomService.create(data);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.hotelRoomService.findById(id);
  }

  @Get()
  async search(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('hotel') hotel: string,
    @Query('isEnabled') isEnabled?: string,
  ) {
    let isEnabledBool: boolean | undefined = undefined;
    if (isEnabled === 'true') {
      isEnabledBool = true;
    } else if (isEnabled === 'false') {
      isEnabledBool = false;
    }

    const params: SearchRoomsParams = {
      limit,
      offset,
      hotel,
      isEnabled: isEnabledBool,
    };

    return this.hotelRoomService.search(params);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<any>) {
    return this.hotelRoomService.update(id, data);
  }

  private isUserAuthenticated(): boolean {
    // Логика для проверки аутентификации пользователя
    // Например, проверка токена или сессии
    return false; // Заглушка для примера
  }
}
