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
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          producerOnlyMode: true, // Only producing messages
        },
      },
    ]),
  ],
  providers: [
    {
      provide: 'KAFKA_SERVICE',
      useExisting: 'KAFKA_SERVICE',
    },
  ],
  exports: ['KAFKA_SERVICE'],
})
export class KafkaModule {}