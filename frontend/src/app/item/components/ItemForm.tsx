'use client';

import { useState } from 'react';
import { Text ,Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading, useToast, Flex, Image, Center, Grid, Divider} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createItem } from '../services/itemService';
import { Item } from '../../../types/item';
import { NumericFormat } from 'react-number-format';
import FileBase64 from 'react-file-base64';
import { AddIcon } from '@chakra-ui/icons';

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
  
  const handleImageChange = ({ base64 }: { base64: string }) => {
    setItem(prevItem => ({ ...prevItem, image: base64 }));
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
    <Box padding={"1rem"} height={"90%"} width="80%" borderWidth={1} borderRadius={8} boxShadow="lg" mx="auto" mt="1rem">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h1" size="lg" mb={4}>Registro de Items</Heading>
        <Grid 
            templateColumns="repeat(2, 1fr)"
            gap={5}
            width="90%">

          <Box  paddingTop={"2rem"}>
            <FormControl id="item_name" isRequired>
              <FormLabel>Nome do Item</FormLabel>
              <Input name="item_name" value={item.item_name} onChange={handleChange} />
            </FormControl>
          </Box>
          <Flex alignItems="center" gridRow={"span 2"} gap={"2rem"}>
            <Box>
              <FormControl id="image" isRequired>
                <FormLabel>Imagem Representativa</FormLabel>
                <FileBase64 multiple={false} onDone={handleImageChange} />
              </FormControl>
            </Box>   
            <Box
              borderWidth="2px"
              borderRadius="lg"
              overflow="hidden"
              w="300px"
              h="300px"
              position="relative"
              boxShadow="md"
              textAlign="center"
            >
              <Text fontSize="xl" fontWeight="bold" mb={2} position="absolute" top="10px" width="100%">
                Preview da Imagem
              </Text>
              <Box
                position="absolute"
                top="3rem"
                bottom="2rem"
                left="2rem"
                right="2rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {item.image && (
                  <Image
                    maxH="100%"
                    maxW="100%"
                    src={item.image}
                    objectFit="cover"
                    alt="Preview"
                  />
                )}
              </Box>
            </Box>
          </Flex>
          <Box marginBottom={"2rem"}>
            <FormControl id="description" isRequired>
              <FormLabel>Descrição</FormLabel>
              <Textarea name="description" value={item.description} onChange={handleChange} />
            </FormControl>
          </Box>
          <Divider orientation="horizontal" gridColumn={"span 2"} borderWidth={"1px"}/>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box width={"30%"}>
              <FormControl id="purchasePrice" isRequired>
                <FormLabel>Preço de Compra</FormLabel>
                <NumericFormat
                  name="purchasePrice"
                  value={item.purchasePrice}
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    setItem((prevItem) => ({ ...prevItem, purchasePrice: floatValue || 0 }));
                  }}
                  thousandSeparator={true}
                  prefix={'R$ '}
                  customInput={Input}
                />
              </FormControl>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box width={"30%"}>
              <FormControl id="stockQuantity" isRequired>
                <FormLabel>Quantidade em Estoque</FormLabel>
                <Input name="stockQuantity" type="number" value={item.stockQuantity} onChange={handleChange} />
              </FormControl>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box width={"30%"}>
              <FormControl id="salePrice" isRequired>
                <FormLabel>Preço de Venda</FormLabel>
                <NumericFormat
                  name="salePrice"
                  value={item.salePrice}
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    setItem((prevItem) => ({ ...prevItem, salePrice: floatValue || 0 }));
                  }}
                  thousandSeparator={true}
                  prefix={'R$ '}
                  customInput={Input}
                />
              </FormControl>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box width={"30%"}>
              <FormControl id="minimumStock" isRequired>
                <FormLabel>Estoque Minimo</FormLabel>
                <Input name="minimumStock" type="number" value={item.minimumStock} onChange={handleChange} />
              </FormControl>
            </Box>
          </Box>
          <Box>
            <FormControl id="category" isRequired>
              <FormLabel>Categoria</FormLabel>
              <Select name="category" value={item.category} onChange={handleChange}>
                <option value="Porção">Porção</option>
                <option value="Bebida">Bebida</option>
                <option value="Combo">Combo</option>
                <option value="Diversos">Diversos</option>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="storageLocation" isRequired>
              <FormLabel>Local do Estoque</FormLabel>
              <Input name="storageLocation" value={item.storageLocation} onChange={handleChange} />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="generalInformation" >
              <FormLabel>Informações Adicionais</FormLabel>
              <Textarea name="generalInformation" value={item.generalInformation} onChange={handleChange} />
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" paddingTop={"2rem"}>
            <Button type="submit" colorScheme="blue" width="12rem">
              <AddIcon marginRight={"5px"}/>
              REGISTRAR ITEM
            </Button>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
}
