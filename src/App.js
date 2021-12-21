import { useConnectWallet } from './hooks/useConnectWallet';
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from 'react';

import {
  VStack,
  Heading,
  Text,
  IconButton,
  useColorMode
} from '@chakra-ui/react';


function App() {
  const initialTodos = [
    {id: 1, text: 'write smart contract'},
    {id: 2, text: 'deploy smart contract'},
    {id: 3, text: 'build front end'},
  ];
  const [ currentAccount, requestAccounts ] = useConnectWallet();
  const [todos, setTodos] = useState(initialTodos);

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  }

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  }

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <VStack p={4}>
      <IconButton aria-label='change color-mode' icon={colorMode === 'light' ?<FaSun /> : <FaMoon />} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode}/>
      <Heading as='h1' size='4xl' mb='8' fontWeight='extrabold' bgGradient='linear(to-r, pink.500, pink.300, blue.500)' bgClip='text' >Todo List</Heading>
      <Text>Your Todo List stored on the blockchain!</Text>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
      />
      <AddTodo addTodo={addTodo} todos={todos}/>
    </VStack>
  );
}

export default App;
