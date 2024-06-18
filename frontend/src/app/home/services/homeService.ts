// src/app/home/services/homeService.ts
import { GetItems } from '../../../types/getItems';

export async function getItemList(): Promise<GetItems[]> {
  const response = await fetch('http://localhost:5000/items');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  const data: GetItems[] = await response.json();
  return data;
}
