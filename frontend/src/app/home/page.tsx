"use client";

import { Box, Heading, Text, Button, useColorModeValue, Flex, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import ItemList from '../home/components/ItemList';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Aqui você pode adicionar a lógica para limpar os dados de autenticação do usuário
    // Por exemplo, remover o token de autenticação do localStorage ou cookies
    router.push('/login');
  };

  const handleNavigateToItemForm = () => {
    router.push('/item'); // Certifique-se de que a rota '/item' está correta
  };

  return (
    <Box textAlign="left" py={10} px={6} bg={useColorModeValue('gray.50', 'gray.800')} minHeight="100vh">
      <Heading as="h1" size="xl" mb={1} textShadow="2px 2px 3px rgba(0, 0, 0, 0.5)" color="#00AAFF">
        SISTEMA DE GERENCIAMENTO DE ESTOQUE
      </Heading>
      <Text fontSize="lg" mb={6}>
        Bem Vindo de Volta!
      </Text>
      <Flex justifyContent={"left"} gap={"2rem"}>
        <Button colorScheme="red"  onClick={handleLogout} mb={4}>
          DESLOGAR
        </Button>
        <Button colorScheme="blue" onClick={handleNavigateToItemForm}>
          REGISTRO DE NOVOS ITENS
        </Button>
      </Flex>
      <Divider orientation="horizontal" borderWidth={"2px"}/>
      <Box>
        <ItemList />
      </Box>
    </Box>
  );
}


