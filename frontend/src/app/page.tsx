// src/app/page.tsx
import { Box, Heading, Text, Link } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Home Page
      </Heading>
      <Text fontSize="lg" mb={6}>
        This is a simple home page. Go to the <Link href="/login" color="teal.500">Login Page</Link>.
      </Text>
    </Box>
  );
}
