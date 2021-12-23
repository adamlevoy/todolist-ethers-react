import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import React, {useState} from 'react';

const AddTodo = ({ addTodo, isMining }) => {

  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      toast({
        title: 'No text!',
        description: "Add text to Todo.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    console.log(text);
    addTodo(text);
    setText('');
  }

  const [text, setText] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt='8'>
        <Input variant='filled' placeholder='something important' value={text} onChange={(e) => setText(e.target.value)} />
        {isMining ? <Button colorScheme='pink' px='8' isLoading loadingText='Adding Todo'>Add Todo</Button> : <Button colorScheme='pink' px='8' type='submit'>Add Todo</Button>}
      </HStack>
    </form>
  )
}

export default AddTodo
