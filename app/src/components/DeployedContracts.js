import { useContext } from "react";
import { EscrowContext } from "../context/escrowContext";
import Escrow from "./Escrow";

const ExistingContracts = function () {
  const escrowContext = useContext(EscrowContext);
  return (
    <div className="existing-contracts">
      {console.log(escrowContext.escrow)}
      {escrowContext.escrow ? <div id='container'>
        <h1>Existing Deployed Contracts</h1>
        {escrowContext.escrow.map(es => {
          return <Escrow key={es.address} {...es} />;
        })}
      </div> : <div id="container-empty"><h1>No contracts to display....</h1></div> }
    </div>
  );
};

export default ExistingContracts;