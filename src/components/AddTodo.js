import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import React, {useState} from 'react';
import { nanoid } from 'nanoid';

const AddTodo = ({ addTodo, todos }) => {

  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      toast({
        title: 'No content!',
        description: "Add content to Todo.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    console.log(content);
    const todo = {
      id: nanoid(),
      text: content
    }
    addTodo(todo);
    setContent('');
  }

  const [content, setContent] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt='8'>
        <Input variant='filled' placeholder='something important' value={content} onChange={(e) => setContent(e.target.value)} />
        <Button colorScheme='pink' px='8' type='submit'>Add Todo</Button>
      </HStack>
    </form>
  )
}

export default AddTodo
