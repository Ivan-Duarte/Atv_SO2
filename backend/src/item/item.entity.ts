import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn({ type: "int" })
  item_id!: number;

  @Column({ type: "varchar", length: 150 })
  item_name!: string;

  @Column({ type: "varchar", length: 200 })
  description!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  purchasePrice!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salePrice!: number;

  @Column({ type: "int" })
  stockQuantity!: number;

  @Column({ type: "int" })
  minimumStock!: number;

  @Column({ type: "varchar", length: 100 })
  storageLocation!: string;

  @Column('text', { nullable: true })
  generalInformation!: string;

  @Column({ default: true })
  is_active!: boolean;

  @ManyToOne(() => Category, category => category.category_items)
  category!: Category;
}


