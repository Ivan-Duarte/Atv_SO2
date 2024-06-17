// src/app/item/services/itemService.ts
import { Item } from '../../../types/item';

export async function createItem(body: Item) {
  const response = await fetch('http://localhost:5000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response;
}
