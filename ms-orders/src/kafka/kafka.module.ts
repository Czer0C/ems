import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['127.0.0.1:9092'],
          },
          producerOnlyMode: true, // ✅ Ensures this module is only producing messages
        },
      },
    ]),
  ],
  providers: [], // ✅ Required even if empty
  exports: [ClientsModule], // ✅ Export ClientsModule instead of 'KAFKA_SERVICE'
})
export class KafkaModule {}
