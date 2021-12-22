import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useConnectWallet } from './hooks/useConnectWallet';
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { FaMoon, FaSun } from "react-icons/fa";
import TodoListABI from './utils/TodoList.json';

import {
  VStack,
  Heading,
  Text,
  IconButton,
  useColorMode,
  Button,
  HStack
} from '@chakra-ui/react';


function App() {
  const {ethereum} = window;
  const CONTRACT_ADDRESS = '0x3f831106a2653BC62a245091c1d3D720133f07B2';
  const CHAIN_ID = "0x4";
  const {colorMode, toggleColorMode} = useColorMode();

  // const initialTodos = [
  //   {id: 1, text: 'write smart contract'},
  //   {id: 2, text: 'deploy smart contract'},
  //   {id: 3, text: 'build front end'},
  // ];

  const [ currentAccount, requestAccounts ] = useConnectWallet();
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isDeletingTodo, setIsDeletingTodo] = useState(false);
  const [isTogglingTodo, setIsTogglingTodo] = useState(false);
  const [myTodoList, setMyTodoList] = useState([]);

  const checkIfWalletIsConnected = () => {
    if (currentAccount) {
      updateTodoList();
    } else {
      alert("Connect your wallet!");
    }
  }

  const updateTodoList = async () => {
    if(!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    try {
      let currentChainId = await ethereum.request({method: "eth_chainId"});
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const todoListContract = new ethers.Contract(CONTRACT_ADDRESS, TodoListABI.abi, signer);

      if(currentChainId === CHAIN_ID) {
        const todoList = await todoListContract.getTodoListByOwner();
        const todoListCleaned = todoList.map((todo) => {
          return {
            id: todo.id,
            text: todo.text,
            completed: todo.completed
          }
        });
        setMyTodoList(todoListCleaned);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const addTodo = async (todo) => {
    if(!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    try {
      let currentChainId = await ethereum.request({method: "eth_chainId"});
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const todoListContract = new ethers.Contract(CONTRACT_ADDRESS, TodoListABI.abi, signer);

      if (currentChainId === CHAIN_ID) {
        setIsAddingTodo(true);
        console.log("Open sesame ⛽");
        const addTodoTxn = await todoListContract.addTodo(todo);
        console.log("Adding Todo ⛏️");
        await addTodoTxn.wait();
        console.log(`Added Todo ✅ HUZZAH! See transaction: https://rinkeby.etherscan.io/tx/${addTodoTxn.hash}`);
        // update todo list state
        // const todoList = await todoListContract.getTodoListByOwner();
        // const todoListCleaned = todoList.map((todo) => {
        //   return {
        //     id: todo.id,
        //     text: todo.text,
        //     completed: todo.completed
        //   }
        // });
        // setMyTodoList(todoListCleaned);
        updateTodoList();
        setIsAddingTodo(false);
      } else {
        alert("Please connect to Rinkeby Test Network.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTodo = async (id) => {
    let currentChainId = await ethereum.request({method: "eth_chainId"});
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const todoListContract = new ethers.Contract(CONTRACT_ADDRESS, TodoListABI.abi, signer);

    if (ethereum && currentChainId === CHAIN_ID) {
      setIsDeletingTodo(true);
      console.log("Open sesame ⛽");
      const deleteTodoTxn = await todoListContract.removeTodo(id);
      console.log("Deleting Todo ⛏️");
      await deleteTodoTxn.wait();
      console.log(`Deleted Todo ✅ HUZZAH! See transaction: https://rinkeby.etherscan.io/tx/${deleteTodoTxn.hash}`);
      // update todo list state
      updateTodoList();
      setIsDeletingTodo(false);
    } else {
      alert("Please connect to Rinkeby Test Network.")
    }
  }

  const toggleTodo = async (id) => {
    let currentChainId = await ethereum.request({method: "eth_chainId"});
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const todoListContract = new ethers.Contract(CONTRACT_ADDRESS, TodoListABI.abi, signer);

    if (ethereum && currentChainId === CHAIN_ID) {
      setIsTogglingTodo(true);
      console.log("Open sesame ⛽");
      const toggleTodoTxn = await todoListContract.toggleCompleted(id);
      console.log("Toggling Todo ⛏️");
      await toggleTodoTxn.wait();
      console.log(`Toggled Todo ✅ HUZZAH! See transaction: https://rinkeby.etherscan.io/tx/${toggleTodoTxn.hash}`);
      // update todo list state
      updateTodoList();
      setIsTogglingTodo(false);
    } else {
      alert("Please connect to Rinkeby Test Network.")
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    //eslint-disable-next-line
  }, [currentAccount]);

  return (
    <VStack p={4}>
      <HStack alignSelf='flex-end'>
        {currentAccount ? <Button isDisabled colorScheme='green'>Connected</Button> : <Button onClick={requestAccounts}>Connect Wallet</Button>}
        <IconButton aria-label='change color-mode' icon={colorMode === 'light' ?<FaSun /> : <FaMoon />} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode}/>
      </HStack>
      <Heading as='h1' size='4xl' mb='8' fontWeight='extrabold' bgGradient='linear(to-r, pink.500, pink.300, blue.500)' bgClip='text' >Todo Chain</Heading>
      <Text fontSize='2xl'>Your web3 enabled Todo app!</Text>
      <TodoList
        todos={myTodoList}
        deleteTodo={deleteTodo}
        isDeletingTodo={isDeletingTodo}
        toggleTodo={toggleTodo}
        isTogglingTodo={isTogglingTodo}
      />
      <AddTodo addTodo={addTodo} isMining={isAddingTodo}/>
    </VStack>
  );
}

export default App;