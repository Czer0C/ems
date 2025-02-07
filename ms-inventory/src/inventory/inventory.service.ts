import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find();
  }

  findOne(id: number): Promise<Inventory | null> {
    return this.inventoryRepository.findOneBy({ id });
  }

  async create(inventory: Partial<Inventory>): Promise<Inventory> {
    const newInventory = this.inventoryRepository.create(inventory);
    
    return this.inventoryRepository.save(newInventory);
  }

  async update(id: number, data: Partial<Inventory>) {
    await this.inventoryRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }

  async updateStock(product: string) {
    const inventory = await this.inventoryRepository.findOneBy({ name:product });
    
    if (!inventory) {
      throw new Error('Inventory not found');
    }

    inventory.quantity -= 1;
    return this.inventoryRepository.save(inventory);
  }
}
