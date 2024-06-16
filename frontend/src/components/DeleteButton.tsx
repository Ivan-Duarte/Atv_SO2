import { Button } from '@chakra-ui/react';

interface DeleteButtonProps {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <Button colorScheme="red" onClick={onClick}>
      Delete
    </Button>
  );
}
