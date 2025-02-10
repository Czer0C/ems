import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { Shipment } from './shipping.entity';
import { ShippingConsumer } from 'src/shipping/shipping.consumer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment]),

  ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        },
        consumer: {
          groupId: 'shipping-service-group',
        },
      },
    },
  ]),
],
  controllers: [ShippingController],
  providers: [ShippingService, ShippingConsumer],
})
export class ShippingModule {}
