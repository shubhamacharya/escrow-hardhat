import { useState, useContext, useReducer } from "react";
import { ethers } from "ethers";
import { EscrowContext } from "../context/escrowContext";
import deploy from "../utils/deployContract";
import request from "../utils/axiosRequest";

const init = {
  arbiter: "",
  isValidArbiter: null,
  recipient: "",
  isValidRecipient: null,
  amount: "",
  isValidAmount: null,
};

const escrowReducer = (state, action) => {
  return action.type === "submit"
    ? { ...init }
    : {
      ...state,
      [action.type]: action.payload,
      [`isValid${action.type}`]:
        action.type === "amount"
          ? /^\d+(?:\.\d+)?$/.test(action.payload)
          : ethers.utils.isAddress(action.payload),
    };
};

export default function CreateNewContract() {
  const escrowContext = useContext(EscrowContext);
  const [newEscrow, createNewEscrow] = useReducer(escrowReducer, init);
  const [isDeploying, setIsDeploying] = useState(false);
  const isValid = () => {
    // eslint-disable-next-line
    let { isValidArbiter, isValidRecipient, isAmountValid } = newEscrow;
    return true//isValidArbiter && isValidRecipient && isAmountValid;
  };

  const inputFields = [
    {
      label: "Arbiter Address",
      id: "arbiter",
      value: newEscrow.arbiter,
      isValid: newEscrow.isValidArbiter,
    },
    {
      label: "Recipient Address",
      id: "recipient",
      value: newEscrow.recipient,
      isValid: newEscrow.isValidRecipient,
    },
    {
      label: "Deposit Amount (ETH)",
      id: "amount",
      value: newEscrow.amount,
      isValid: newEscrow.isAmountValid,
    },
  ];

  async function newContractHandler(handle) {
    handle.preventDefault();
    setIsDeploying(true);
    try {
      const escrowContract = await deploy(
        escrowContext.signer,
        newEscrow.arbiter,
        newEscrow.recipient,
        ethers.utils.parseEther(newEscrow.amount)
      );

      const escrowInstance = {
        address: escrowContract.address,
        arbiter: newEscrow.arbiter,
        recipient: newEscrow.recipient,
        amount: newEscrow.amount,
      };

      let res = await request.post("/createNewContract", escrowInstance);
      console.log(res);
      escrowContext.setEscrow([...escrowContext.escrow, escrowInstance]);
      createNewEscrow({ type: "submit", payload: null });
    } catch (error) {
      console.log("Error in CreateNewContract: newContractHandler", error);
      alert('neContractHandler', error.message);
    }
    setIsDeploying(false);
    console.log(isDeploying);
  }

  return (
    <form className="contract" onSubmit={newContractHandler}>
      <h1> Create New Escrow </h1>
      {inputFields.map((input) => (
        <label
          key={input.id}
          className={
            input.isValid || input.isValid == null ? "" : "invalid-text"
          }
        >
          {input.label}
          <input
            className={
              input.isValid || input.isValid == null
                ? ""
                : "invalid-border invalid-text"
            }
            type="text"
            id={input.id}
            value={input.value}
            onChange={(e) => {
              createNewEscrow({
                type: e.target.id,
                payload: e.target.value,
              })
            }
            }
            required
          />
        </label>
      ))}
      <button
        className="button"
        id="deploy"
        type="submit"
        name="Create"
        disabled={!isValid() || isDeploying}
      >
        {isDeploying ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
