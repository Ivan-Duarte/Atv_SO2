'use client'; // Adiciona esta linha no início do arquivo

import LoginForm from './components/LoginForm';
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Bem Vindo!
        </Heading>
        <LoginForm />
      </Box>
    </Flex>
  );
}


