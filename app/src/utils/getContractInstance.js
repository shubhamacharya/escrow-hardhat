import { ethers } from "ethers";
import artifacts from "../artifacts/contracts/Escrow.sol/Escrow.json";

const getContractInstance = (address, signer) => {
    return new ethers.Contract(address, artifacts.abi, signer);
};

export default getContractInstance;
