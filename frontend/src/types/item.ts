// src/types/item.ts
export interface Item {
    name: string;
    image: string;
    description: string;
    purchasePrice: number;
    salePrice: number;
    stockQuantity: number;
    minimumStock: number;
    category: string;
    stockLocation: string;
    additionalInfo?: string;
  }
  