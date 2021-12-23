import { useState } from 'react';
import { ethers } from 'ethers';

export const useConnectWallet = () => {
  const {ethereum} = window;
  const [account, setAccount] = useState({});

  const connectWallet = async () => {
    if(!ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      await ethereum.request({method: "eth_requestAccounts"});
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const ens = await provider.lookupAddress(address);
      const avatar = await provider.getAvatar(address);
      console.log("Connected account:", address);
      setAccount({
        address,
        ens,
        avatar
      });
    } catch (error) {
      console.log(error);
    }
  }
  return [account, connectWallet];
}
