import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { Shipment } from './shipping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
