import { useContext } from 'react';
import { EscrowContext } from './context/escrowContext';
import CreateNewContract from './components/NewContract';
import ExistingContracts from './components/DeployedContracts';

export default function App() {
    // provider = null
    let { provider, account } = useContext(EscrowContext);

    return provider ? (
        <div className='provider-success'>
            <div className='title'>
                <h1 className='text-center heading'>Decentralized Escrow Application</h1>
                <p>
                    <strong>User Address:</strong> {account}
                </p>
            </div>
            <div className='info-cards'>
                <CreateNewContract />
                <ExistingContracts />
            </div>
        </div>
    ) : (
        <div className='info-cards provider-error'>
            <p>You need to install a browser wallet to use the DApp</p>
        </div>
    );
}
