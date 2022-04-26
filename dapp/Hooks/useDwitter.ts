import Dwitter from './Dwitter.json';
import { ethers, providers } from 'ethers';
import { useState, useEffect } from 'react';

const ContractABI = Dwitter.abi;
const ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const Ethereum = typeof window !== 'undefined' && (window as any).ethereum;
const getDwitterContract = () => {
  const provider = new ethers.providers.Web3Provider(Ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(ContractAddress, ContractABI, signer);
};

type User = () => {
  avatar: string;
  bio: string;
  name: string;
  username: string;
  wallet: string;
};

const useDwitter = () => {
  // const Dwitter = getDwitterContract();
  const [currentAccount, setCurrentAccount] = useState<String>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const connectWallet = async () => {
    try {
      if (!Ethereum) {
        alert('Please install metamask');
        return;
      }

      const accounts = await Ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length === 0) {
        console.log('No authorized accounts');
        return;
      }
      const account = accounts[0];
      console.log('connected to account : ', account);
      setCurrentAccount(account);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!Ethereum) {
      console.log('No Ethereum wallet found  please connect to metamask');
      return;
    }
    connectWallet();
  }, []);

  //another UE for user
  useEffect(() => {
    if (currentAccount) getUser();
  }, [currentAccount]);

  const getUser = async () => {
    const Contract = getDwitterContract();
    const user = await Contract.getUser(currentAccount);
    const { avatar, bio, name, username, wallet } = user;
    setCurrentUser({ avatar , bio, name, username, wallet });
    return user;
  };

  const createUser = async (
    username: string,
    name: string,
    bio: string,
    avatar: string
  ) => {
    const contract = getDwitterContract();
    const user = await contract.signup(username,name,bio,avatar);
    console.log(user);
    
  };
  return { connectWallet, account: currentAccount, user: currentUser  ,createUser};
};

export default useDwitter;
