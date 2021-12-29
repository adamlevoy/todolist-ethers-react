import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useConnectWallet } from './hooks/useConnectWallet';
import TodoList from './components/TodoList'
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
  HStack,
  Avatar
} from '@chakra-ui/react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

// testing

function App() {
  const {ethereum}: any = window;
  const CONTRACT_ADDRESS = '0x3f831106a2653BC62a245091c1d3D720133f07B2';
  const CHAIN_ID = "0x4";
  const {colorMode, toggleColorMode} = useColorMode();

  // const initialTodos = [
  //   {id: 1, text: 'write smart contract'},
  //   {id: 2, text: 'deploy smart contract'},
  //   {id: 3, text: 'build front end'},
  // ];

<<<<<<< HEAD:src/App.tsx
  const [ currentAccount, requestAccounts ]: any = useConnectWallet();
=======
  const [ account, connectWallet ] = useConnectWallet();
>>>>>>> df0413023ee468a95ac16f6bb9718532dc154c03:src/App.js
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isDeletingTodo, setIsDeletingTodo] = useState(false);
  const [isTogglingTodo, setIsTogglingTodo] = useState(false);
  const [myTodoList, setMyTodoList] = useState([]);

  const checkIfWalletIsConnected = () => {
    if (account) {
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
        const todoListCleaned = todoList.map((todo: Todo) => {
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

  const addTodo = async (todo: string) => {
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
        updateTodoList();
        setIsAddingTodo(false);
      } else {
        alert("Please connect to Rinkeby Test Network.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTodo = async (id: number) => {
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

  const toggleTodo = async (id: number) => {
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

  const shortenAddress = (address) => {
    return `${address.slice(0,4)}...${address.slice(
      address.length - 4,
      address.length)}`
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    //eslint-disable-next-line
  }, [account]);

  return (
    <VStack p={4}>
      <HStack alignSelf='flex-end'>
<<<<<<< HEAD:src/App.tsx
        {currentAccount ? <Button isDisabled colorScheme='green'>Connected</Button> : <Button onClick={requestAccounts}>Connect Wallet</Button>}
        <IconButton aria-label='change color-mode' icon={colorMode === 'light' ?<FaSun /> : <FaMoon />} isRound={true} size='lg' alignSelf='flex-end' onClick={toggleColorMode}/>
=======
        {account.address ? (
          <HStack border='2px' borderRadius='10' borderColor='gray.400' p='1.5'>
            <Avatar src={account.avatar} size='sm'/>
            <Text>{account.ens ? account.ens : shortenAddress(account.address)}</Text>
          </HStack>)
          : (<Button onClick={connectWallet}>Connect Wallet</Button>)}
        <IconButton aria-label='change color-mode' icon={colorMode === 'light' ?<FaSun /> : <FaMoon />} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode}/>
>>>>>>> df0413023ee468a95ac16f6bb9718532dc154c03:src/App.js
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