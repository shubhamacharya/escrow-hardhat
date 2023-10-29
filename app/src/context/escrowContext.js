import React, { useState, useEffect, useCallback } from "react";
import GetEthereumInstance from "../hooks/ethereum";
import request from "../utils/axiosRequest";
import Spinner from "../components/Spinner";

export const EscrowContext = React.createContext({
  provider: {},
  account: {},
  signer: {},
  escrow: [],
  setEscrow: () => {},
});

export default function EscrowContextProvider({ children }) {
  const { provider, account, signer } = GetEthereumInstance();
  console.log("Provider } account } signer", provider, account, signer);
  const [escrow, setEscrow] = useState([]);
  const [loading, setLoading] = useState([]);

  const getEscrow = useCallback(async () => {
    setLoading(true);
    try {
      const escrowAccount = await request.get(`/escrow/${account}`);
      const data = escrowAccount.data;
      setEscrow(data);
    } catch (error) {
      console.log("Error in EscrowContextProvier:getEscrow(): ", error);
      alert(`Escrow Context ${error.message}`);
    }
    setLoading(false);
  }, [account]);

  useEffect(() => {
    getEscrow();
  }, [getEscrow]);

  return (
    <EscrowContext.Provider
      value={{ provider, account, signer, escrow, setEscrow }}
    >
      {loading ? <Spinner loading={loading} /> : children}
    </EscrowContext.Provider>
  );
}
