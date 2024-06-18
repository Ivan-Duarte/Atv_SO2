"use client";

import { Box, Button, Center, Flex, Heading, Text} from '@chakra-ui/react';
import ItemForm from './components/ItemForm';
import { useRouter } from 'next/navigation';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function ItemPage() {
  const router = useRouter();
  
  const handleNavigateToItemForm = () => {
    router.push('/home'); // Certifique-se de que a rota '/item' está correta
  };
  return (
    <main>
      <Flex
        justifySelf={'flex-start'}
        direction={"column"}
        width={'100%'}
      >
        <Box display={"flex"} justifyContent={"center"} paddingTop={"1rem"}>
          <Button colorScheme="blue" onClick={handleNavigateToItemForm}>
          <ArrowBackIcon marginRight={"5px"}/>
            MENU
          </Button>
        </Box>
        <Center>
          <ItemForm />
        </Center>
      </Flex>
    </main>
  );
}
