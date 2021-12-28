import { HStack, VStack, Text, IconButton, StackDivider, Spacer, Badge } from '@chakra-ui/react';
import { FaTrash, FaCheck } from "react-icons/fa";
import React from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

type Props = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  isDeletingTodo: boolean;
  isTogglingTodo: boolean;
  }

const TodoList = ({todos, deleteTodo, toggleTodo, isDeletingTodo, isTogglingTodo}: Props) => {

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
      {todos.map((todo: Todo) => {
        return(
          <HStack key={todo.id}>
            {todo.completed ?
              <Text as='s'>{todo.text}</Text>
              :<Text>{todo.text}</Text>
            }
            <Spacer />
            {isTogglingTodo ?
              <IconButton aria-label='complete todo button loading' icon={<FaCheck/>} isRound={true} isLoading />
              :<IconButton aria-label='complete todo button' icon={<FaCheck/>} isRound={true} onClick={() => toggleTodo(todo.id)} />
            }
            {isDeletingTodo ?
              <IconButton aria-label='delete button loading' icon={<FaTrash/>} isRound={true} isLoading/>
              :<IconButton aria-label='delete button' icon={<FaTrash/>} isRound={true} onClick={() => deleteTodo(todo.id)} />
            }
          </HStack>
        )
      })}
    </VStack>
  )
}

export default TodoList
