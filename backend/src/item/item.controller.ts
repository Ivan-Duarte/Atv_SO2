import { Controller, Get, Param, Delete, NotFoundException, Body, Post, HttpCode } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { CreateItemDto } from '../common/dtos/CreateItem.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Item> {
    const item = await this.itemService.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.itemService.remove(id);
  }

  @Post()
  @HttpCode(201) // Define o código de status HTTP como 201
  async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(createItemDto);
  }
}

