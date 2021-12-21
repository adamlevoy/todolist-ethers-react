import { useState } from 'react';

export const useConnectWallet = () => {
  const {ethereum} = window;
  const [currentAccount, setCurrentAccount] = useState(null);

  const requestAccounts = async () => {
    try {
      if(!ethereum) {
        alert("Get MetaMask!");
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log("Connected account:", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return [currentAccount, requestAccounts];
}
