import { Button, HStack, Input } from '@chakra-ui/react';
import React from 'react'

const AddTodo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt='8'>
        <Input variant='filled' placeholder='something important' />
        <Button colorScheme='pink' px='8' type='submit'>Add Todo</Button>
      </HStack>
    </form>
  )
}

export default AddTodo
