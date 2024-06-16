import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({type: "int"})
  user_id!: number;

  @Column({type: "varchar", length: 150 })
  user_name!: string;

  @Column({type: "varchar", length: 150})
  user_email!: string;

  @Column({type: "char", length: 80})
  user_password!: string;

  @Column({ default: true })
  is_active!: boolean;
}


