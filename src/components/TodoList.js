import { HStack, VStack, Text, IconButton, StackDivider, Spacer, Badge } from '@chakra-ui/react';
import { FaTrash, FaCheck } from "react-icons/fa";
import React from 'react'

const TodoList = ({todos, deleteTodo, toggleTodo, isDeletingTodo, isTogglingTodo}) => {

  if (!todos.length) {
    return (
      <Badge colorScheme='green' p='4' m='4' borderRadius='lg'>
        No Todos, w00t!
      </Badge>
    )
  }

  return (
    <VStack
      alignItems='stretch'
      divider={<StackDivider />}
      borderColor='gray.100'
      borderWidth='2px'
      borderRadius='lg'
      padding='4'
      w='100%'
      maxW={{base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw'}}
    >
      {todos.map((todo) => {
        return(
          <HStack key={todo.id}>
            {todo.completed ?
              <Text as='s'>{todo.text}</Text>
              :<Text>{todo.text}</Text>
            }
            <Spacer />
            {isTogglingTodo ?
              <IconButton icon={<FaCheck/>} isRound='true' isLoading />
              :<IconButton icon={<FaCheck/>} isRound='true' onClick={() => toggleTodo(todo.id)} />
            }
            {isDeletingTodo ?
              <IconButton icon={<FaTrash/>} isRound='true' isLoading/>
              :<IconButton icon={<FaTrash/>} isRound='true' onClick={() => deleteTodo(todo.id)} />
            }
          </HStack>
        )
      })}
    </VStack>
  )
}

export default TodoList
