// src/item/item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn({ type: "int" })
  item_id!: number;

  @Column({ type: "varchar", length: 150 })
  item_name!: string;

  @Column({ type: "longtext"})
  image!: string;

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

  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Column({ default: true })
  is_active!: boolean;
}


