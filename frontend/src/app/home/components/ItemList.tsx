'use client';

import { useState, useEffect } from 'react';
import { Box, Input, VStack, Image, Text, SimpleGrid, StarIcon, Badge, Stack, Heading, Flex} from '@chakra-ui/react';
import { getItemList } from '../services/homeService';
import { GetItems } from '../../../types/getItems';

export default function ItemList() {
  const [items, setItems] = useState<GetItems[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getItemList();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    }
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => 
    item.item_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={5}>
      <Input 
        placeholder="Buscar item pelo nome" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={5}
      />
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
        {filteredItems.map(item => (
          <Box key={item.item_id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} maxH={"40rem"} width={"25rem"}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="300px"
                    h="300px"
                    position="relative"
                    boxShadow="md"
                    textAlign="center"
                    mx="auto">
                        <Image 
                                src={`data:image/png;base64,${item.image}`} // Prefixe a string base64 com 'data:image/png;base64,' ou 'data:image/jpeg;base64,'
                                alt={item.item_name} 
                                maxH="100%"
                                maxW="100%"
                                objectFit="cover"
                            />
                </Box>
                <Box mt={"1rem"} height={"15rem"} p={5} shadow='md' borderWidth='1px'>
                    <VStack  align="start" mt={1}>
                        <Text fontSize={"20px"} fontWeight="bold">{item.item_name}</Text>
                        <Box height='5rem' width='100%' overflowY='auto' shadow='md' borderWidth='1px'>
                            <Text marginLeft={"1rem"} textAlign={"left"}>{item.description}</Text>
                        </Box>
                        <Text>Valor de Venda: R$ {item.salePrice}</Text>
                        <Flex justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
                            <Text fontWeight={"bold"} >Categoria:</Text>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                {item.category}
                            </Badge>
                        </Flex>
                    </VStack>
                </Box>   
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
