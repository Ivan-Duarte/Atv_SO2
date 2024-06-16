'use client'; // Adiciona esta linha no início do arquivo

import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, VStack, Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; // Atualize a importação para 'next/navigation'
import LoginButton from '../../../components/LoginButton';
import { login } from '../services/loginService';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await login(email, password);

    if (response.ok) {
      toast({
        title: 'Login Bem Sucessido',
        description: 'Bem-vindo novamente!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Redireciona o usuário para a página principal
      router.push('/home');
    } else {
      toast({
        title: 'Erro no Login.',
        description: 'Credenciais Invalidas, Por favor tente novamente.',
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
        <LoginButton onClick={() => {}} />
      </VStack>
    </Box>
  );
}
