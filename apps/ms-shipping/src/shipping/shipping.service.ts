import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  
  ) {}

  

  findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find();
  }

  findOne(id: number): Promise<Shipment | null> {
    return this.shipmentRepository.findOneBy({ id });
  }

  async create(shipment: Partial<Shipment>): Promise<Shipment> {
    const newShipment = this.shipmentRepository.create(shipment);
    return this.shipmentRepository.save(newShipment);
  }

  async updateStatus(id: number, status: string) {
    await this.shipmentRepository.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.shipmentRepository.delete(id);
  }
}
