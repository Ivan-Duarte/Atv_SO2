'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading, useToast, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createItem } from '../services/itemService';
import { Item } from '../../../types/item';
import { NumericFormat } from 'react-number-format';
import FileBase64 from 'react-file-base64';

export default function ItemForm() {
  const [item, setItem] = useState<Item>({
    item_name: '',
    image: '',
    description: '',
    purchasePrice: 0.00,
    salePrice: 0.00,
    stockQuantity: 0,
    minimumStock: 0,
    category: '',
    storageLocation: '',
    generalInformation: ''
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

    console.log('Tamanho da imagem em bytes:', item.image.length * 0.75); // Verificando o tamanho da imagem

    console.log('Submitting item:', item); // Log para verificar o item antes do envio
    
    try {
      const response = await createItem(item);
      if (response.ok) {
        toast({
          title: 'Item Cadastrado com Sucesso!',
          description: 'Item ' + item.item_name + ' salvo com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/home');
      } else {
        const errorData = await response.json(); // Log para verificar a resposta do erro
        console.log('Error response:', errorData);
        toast({
          title: 'Erro ao Cadastrar o Item',
          description: 'Erro ao cadastrar o item ' + item.item_name + '! Tente novamente.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to save item ' + item.item_name + '.',
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
        <FormControl id="item_name" isRequired>
          <FormLabel>Nome do Item</FormLabel>
          <Input name="item_name" value={item.item_name} onChange={handleChange} />
        </FormControl>
        <FormControl id="image" isRequired>
          <FormLabel>Imagem Representativa</FormLabel>
          <FileBase64
            multiple={false}
            onDone={({ base64 }: { base64: string }) => setItem(prevItem => ({ ...prevItem, image: base64 }))}
          />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Descrição</FormLabel>
          <Textarea name="description" value={item.description} onChange={handleChange} />
        </FormControl>
        <Flex justifyContent={"center"} gap={"5rem"}>
          <FormControl id="purchasePrice" isRequired>
            <FormLabel>Preço de Compra</FormLabel>
            <NumericFormat 
              name="purchasePrice" 
              value={item.purchasePrice} 
              onValueChange={(values) => {
                const { floatValue } = values;
                setItem(prevItem => ({ ...prevItem, purchasePrice: floatValue || 0 }));
              }} 
              thousandSeparator={true} 
              prefix={'R$ '} 
              customInput={Input} 
            />
          </FormControl>
          <FormControl id="salePrice" isRequired>
            <FormLabel>Preço de Venda</FormLabel>
            <NumericFormat 
              name="salePrice" 
              value={item.salePrice} 
              onValueChange={(values) => {
                const { floatValue } = values;
                setItem(prevItem => ({ ...prevItem, salePrice: floatValue || 0 }));
              }} 
              thousandSeparator={true} 
              prefix={'R$ '} 
              customInput={Input} 
            />
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
        <FormControl id="storageLocation" isRequired>
          <FormLabel>Local do Estoque</FormLabel>
          <Input name="storageLocation" value={item.storageLocation} onChange={handleChange} />
        </FormControl>
        <FormControl id="generalInformation">
          <FormLabel>Informações Adicionais</FormLabel>
          <Textarea name="generalInformation" value={item.generalInformation} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Save Item
        </Button>
      </VStack>
    </Box>
  );
}
