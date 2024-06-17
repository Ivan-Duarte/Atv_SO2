// src/item/dto/create-item.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBase64 } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  item_name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsBase64()
  image!: string;

  @IsNotEmpty()
  @IsNumber()
  purchasePrice!: number;

  @IsNotEmpty()
  @IsNumber()
  salePrice!: number;

  @IsNotEmpty()
  @IsNumber()
  stockQuantity!: number;

  @IsNotEmpty()
  @IsNumber()
  minimumStock!: number;

  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsNotEmpty()
  @IsString()
  storageLocation!: string;

  @IsOptional()
  @IsString()
  generalInformation?: string;
}
