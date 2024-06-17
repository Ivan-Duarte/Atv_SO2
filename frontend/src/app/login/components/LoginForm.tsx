'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { login } from '../services/loginService';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      if (response.ok) {
        toast({
          title: 'Login Aceito!',
          description: 'Olá Novamente!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/home');
      } else {
      const errorData = await response.json(); // Log para verificar a resposta do erro
      console.log('Error response:', errorData);
      toast({
        title: 'Erro no Login!',
        description: 'Credenciais Inválidas, tente novamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    } catch (error) {
      toast({
        title: 'Erro no Login!',
        description: 'Credenciais Inválidas, tente novamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" mx="auto" mt="10%">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h1" size="lg">Login</Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Login
        </Button>
      </VStack>
    </Box>
  );
}
