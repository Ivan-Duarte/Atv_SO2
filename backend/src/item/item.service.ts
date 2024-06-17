import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from '../common/dtos/CreateItem.dto';

@Injectable()
export class ItemService {
  remove(id: number) {
    throw new Error('Method not implemented.');
  }
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

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    try {
      const existingItem = await this.itemRepository.findOne({ where: { item_name: createItemDto.item_name } });
      if (existingItem) {
        throw new ConflictException('Item já cadastrado');
      }

      const { image, ...itemDetails } = createItemDto;
      const item = this.itemRepository.create({
        ...itemDetails,
        image: image.split(',')[1],
      });
      return this.itemRepository.save(item);
    } catch (error) {
      console.error('Error saving item:', error); // Adicione este log para ver o erro detalhado no console do servidor
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: (error as Error).message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}

