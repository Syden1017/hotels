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
import { HotelsService } from './hotels.service';
import {
  UpdateHotelParams,
  SearchHotelParams,
} from './interfaces/hotel.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/common/hotels')
export class HotelsController {
  constructor(private readonly hotelService: HotelsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: any) {
    return this.hotelService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.hotelService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async search(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('title', new DefaultValuePipe('')) title: string,
  ) {
    const params: SearchHotelParams = { limit, offset, title };
    return this.hotelService.search(params);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateHotelParams) {
    return this.hotelService.update(id, data);
  }
}
