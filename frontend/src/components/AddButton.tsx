import { Button } from '@chakra-ui/react';

interface AddButtonProps {
  onClick: () => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <Button colorScheme="green" onClick={onClick}>
      Add
    </Button>
  );
}
