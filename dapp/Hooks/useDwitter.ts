import Dwitter from "./Dwitter.json";
import { ethers,providers }  from "ethers";
import { useState, useEffect } from "react";

const ContractABI = Dwitter.abi;
const ContractAddress ="0x5FbDB2315678afecb367f032d93F642f64180aa3"
const Ethereum =  typeof window !=="undefined" && (window as any).ethereum;
const getDwitterContract = ()=>{
    const provider = new ethers.providers.Web3Provider(Ethereum);
    const signer = provider.getSigner();  
    return new ethers.Contract(
        ContractAddress,
        ContractABI,
        signer 
    );
}
const useDwitter = () => {
    // const Dwitter = getDwitterContract();
    const [currentAccount,setCurrentAccount]= useState<String>('');
    
    const connectWallet = async () => {
        try {
            if(!Ethereum){
                alert("Please install metamask");
                return;
            }
            
            const accounts = await Ethereum.request({method: "eth_requestAccounts"});
            if(accounts.length === 0){
                console.log("No authorized accounts");
                return;
            }
            const account = accounts[0];
            console.log("connected to account : ", account);
            setCurrentAccount(account);
            
        } catch (error) {
            
            console.error(error);
            
        }
    }; 
    useEffect(() => {
      if(!Ethereum){
          console.log("No Ethereum wallet found  please connect to metamask");
          return;
      }
      connectWallet();
    }, [])
    
    return { connectWallet,account: currentAccount };
}

export default useDwitter;
