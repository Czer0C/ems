import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ShippingService } from './shipping.service';
import { Consumer, ConsumerRunConfig, EachMessagePayload, Kafka } from 'kafkajs';

@Injectable()
export class ShippingConsumer implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
    private readonly shippingService: ShippingService
  ) {}

  private readonly kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKERS || '127.0.0.1:9092'],
  });

  private readonly consumer: Consumer = this.kafka.consumer({
    groupId: 'shipping-service-group',
  });

  async consume(config: any) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topics: config.topics, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        await config.eachMessage(payload);
      },
    });
  }

  async onModuleInit() {
    // Subscribe to the topic
    this.kafkaClient.subscribeToResponseOf('orders.created');
    await this.kafkaClient.connect();
    
    console.log('Shipping Service is listening for order.created events...');
  }

  @EventPattern('orders.created')
  async handleOrderCreated(@Payload() message: any) {
    console.log(`Received order event:`, message.value);

    try {
      // Process the order event
      // await this.shippingService.create(message.value);
    } catch (error) {
      console.error('Error processing order event:', error);
    }
  }
}