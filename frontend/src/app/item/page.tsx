// src/app/item/page.tsx
import { Box, Center, Flex, Heading} from '@chakra-ui/react';
import ItemForm from './components/ItemForm';

export default function ItemPage() {
  return (
    <Center>
        <ItemForm />
    </Center>
  );
}
