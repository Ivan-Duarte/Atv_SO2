import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  purchasePrice!: number;

  @Column()
  salePrice!: number;

  @Column()
  stockQuantity!: number;

  @Column()
  minimumStock!: number;

  @Column()
  storageLocation!: string;

  @Column('text', { nullable: true })
  generalInformation!: string;

  @ManyToOne(() => Category, category => category.items)
  category!: Category;
}

