import { ethers } from "ethers";
import artifacts from "../artifacts/contracts/Escrow.sol/Escrow.json";
const { abi, bytecode } = artifacts;

export default async function deploy(signer, arbiter, recipient, value) {
  const Escrow = new ethers.ContractFactory(abi, bytecode, signer);

  const escrowInstance = await Escrow.deploy(arbiter, recipient, { value });

  await escrowInstance.deployed();
  return escrowInstance;
}
