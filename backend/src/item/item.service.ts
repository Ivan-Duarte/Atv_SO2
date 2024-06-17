import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from '../common/dtos/CreateItem.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: {item_id: id }, relations: ['category'] });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    try {
      const existingItem = await this.itemRepository.findOne({ where: { item_name: createItemDto.item_name } });
      if (existingItem) {
        throw new ConflictException('Item já cadastrado');
      }

      const newItem = this.itemRepository.create(createItemDto);
      return this.itemRepository.save(newItem);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: (error as Error).message,
        }, HttpStatus.CONFLICT);
      } else {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: (error as Error).message,
        }, HttpStatus.BAD_REQUEST);
      }
    }
  }
}

