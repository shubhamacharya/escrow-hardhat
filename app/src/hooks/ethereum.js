import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

const GetEthereumInstance = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);

  const getEthereum = useCallback(async () => {
    try {
      const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await walletProvider.send('eth_requestAccounts', []);
      setProvider(walletProvider);
      setAccount(accounts[0]);
      setSigner(walletProvider.getSigner(accounts[0]));
    } catch (error) {
      console.log("Err in getEthreumInstnace: ", error);
    }
  }, []);
  useEffect(() => {
    getEthereum();
  }, [getEthereum]);


  return { provider, account, signer };
};

export default GetEthereumInstance;
