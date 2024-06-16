import { Button } from '@chakra-ui/react';

interface LoginButtonProps {
  onClick: () => void;
}

export default function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <Button colorScheme="teal" onClick={onClick} type="submit">
      Login
    </Button>
  );
}



