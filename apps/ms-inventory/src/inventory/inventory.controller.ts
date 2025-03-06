import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inventory | null> {
    return this.inventoryService.findOne(+id);
  }

  @Post()
  create(@Body() inventory: Partial<Inventory>): Promise<Inventory> {
    return this.inventoryService.create(inventory);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Inventory>) {
    return this.inventoryService.update(+id, data);
  }

  @Put(':product')
  updateStock(@Param('product') product: string) {
    return this.inventoryService.updateStock(product);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.inventoryService.remove(+id);
  }
}
