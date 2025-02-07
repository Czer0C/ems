import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { Shipment } from './shipping.entity';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  findAll(): Promise<Shipment[]> {
    return this.shippingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Shipment | null> {
    return this.shippingService.findOne(+id);
  }

  @Post()
  create(@Body() shipment: Partial<Shipment>): Promise<Shipment> {
    return this.shippingService.create(shipment);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.shippingService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shippingService.remove(+id);
  }
}
