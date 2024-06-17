'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading, useToast, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createItem } from '../services/itemService';
import { Item } from '../../../types/item';

export default function ItemForm() {
  const [item, setItem] = useState<Item>({
    name: '',
    image: '',
    description: '',
    purchasePrice: 0,
    salePrice: 0,
    stockQuantity: 0,
    minimumStock: 0,
    category: '',
    stockLocation: '',
    additionalInfo: ''
  });

  const toast = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: name === 'purchasePrice' || name === 'salePrice' || name === 'stockQuantity' || name === 'minimumStock' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToast = toast({
      title: 'Saving item',
      description: 'Please wait...',
      status: 'info',
      duration: null,
      isClosable: true,
    });

    try {
      const response = await createItem(item);

      toast.close(loadingToast);

      if (response.ok) {
        toast({
          title: 'Item Saved',
          description: 'Item has been successfully saved.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/home');
      } else {
        toast({
          title: 'Save Failed',
          description: 'Unable to save item. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast.close(loadingToast);
      toast({
        title: 'An error occurred.',
        description: 'Unable to save item.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="lg" mx="auto" mt="10%">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h1" size="lg">Registro de Items</Heading>
        <FormControl id="name" isRequired>
          <FormLabel>Nome do Item</FormLabel>
          <Input name="name" value={item.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="image" isRequired>
          <FormLabel>Imagem Representativa URL</FormLabel>
          <Input name="image" value={item.image} onChange={handleChange} />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Descrição</FormLabel>
          <Textarea name="description" value={item.description} onChange={handleChange} />
        </FormControl>
        <Flex justifyContent={"center"} gap={"5rem"}>
            <FormControl id="purchasePrice" isRequired>
            <FormLabel>Preço de Compra</FormLabel>
            <Input name="purchasePrice" type="number" value={item.purchasePrice} onChange={handleChange} />
            </FormControl>
            <FormControl id="salePrice" isRequired>
            <FormLabel>Preço de Venda</FormLabel>
            <Input name="salePrice" type="number" value={item.salePrice} onChange={handleChange} />
            </FormControl>
        </Flex>
        <Flex justifyContent={"center"} gap={"5rem"}>
        <FormControl id="stockQuantity" isRequired>
          <FormLabel>Quantidade em Estoque</FormLabel>
          <Input name="stockQuantity" type="number" value={item.stockQuantity} onChange={handleChange} />
        </FormControl>
        <FormControl id="minimumStock" isRequired>
          <FormLabel>Estoque Minimo</FormLabel>
          <Input name="minimumStock" type="number" value={item.minimumStock} onChange={handleChange} />
        </FormControl>
        </Flex>
        <FormControl id="category" isRequired>
          <FormLabel>Categoria</FormLabel>
          <Select name="category" value={item.category} onChange={handleChange}>
            <option value="Porção">Porção</option>
            <option value="Bebida">Bebida</option>
            <option value="Combo">Combo</option>
            <option value="Diversos">Diversos</option>
          </Select>
        </FormControl>
        <FormControl id="stockLocation" isRequired>
          <FormLabel>Local do Estoque</FormLabel>
          <Input name="stockLocation" value={item.stockLocation} onChange={handleChange} />
        </FormControl>
        <FormControl id="additionalInfo">
          <FormLabel>Informações Adicionais</FormLabel>
          <Textarea name="additionalInfo" value={item.additionalInfo} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Save Item
        </Button>
      </VStack>
    </Box>
  );
}
