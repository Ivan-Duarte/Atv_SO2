'use client'; // Adiciona esta linha no início do arquivo

import { Box, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; // Atualize a importação para 'next/navigation'

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Aqui você pode adicionar a lógica para limpar os dados de autenticação do usuário
    // Por exemplo, remover o token de autenticação do localStorage ou cookies
    router.push('/login');
  };

  return (
    <Box textAlign="center" py={10} px={6} bg={useColorModeValue('gray.50', 'gray.800')} minHeight="100vh">
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Home Page
      </Heading>
      <Text fontSize="lg" mb={6}>
        You are now logged in!
      </Text>
      <Button colorScheme="teal" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

