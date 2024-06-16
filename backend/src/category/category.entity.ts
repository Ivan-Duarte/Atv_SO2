import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from '../item/item.entity';

@Entity({name: 'Categorias'})
export class Category {
  @PrimaryGeneratedColumn({type: "int"})
  category_id!: number;

  @Column({type: "varchar", length: 100})
  category_name!: string;

  @Column({ default: true })
  is_active!: boolean;

  @OneToMany(() => Item, item => item.category)
  category_items!: Item[];
}
