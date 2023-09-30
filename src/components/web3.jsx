import {ethers} from "ethers";
import BridgeKaiABI from "../abis/BridgeKai.json";
import BridgeKaiBPABI from "../abis/BridgeKaiBP.json";
import { useState,useEffect } from 'react';




// connectWallet() function:

export async function connectWallet() {  
  if (window.ethereum) {
    try {
      // Request access to the user's accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Wallet connected!');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  } else {
    console.error('No wallet found!');
  }
}



export function useWeb3State() {

  const [web3State, setWeb3State] = useState({
    provider: undefined,
    signer: undefined,
    BridgeKaicontract: undefined,
    BridgeKaiBPcontract: undefined,
    userAdd: ""
  });


  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Create a new provider and signer
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Create a contract instance
          const BridgeKaicontractAddress = process.env.BRIDGE_KAI_CONTRACT;
          const BridgeKaiBPcontractAddress = process.env.BRIDGE_KAIBP_CONTRACT;
          const BridgeKaicontract = new ethers.Contract(BridgeKaicontractAddress,BridgeKaiABI, signer);
          const BridgeKaiBPcontract = new ethers.Contract(BridgeKaiBPcontractAddress,BridgeKaiBPABI, signer);

          let accounts = await provider.send("eth_requestAccounts", []);
          let userAddress= accounts[0];

          // Update the web3 state
          setWeb3State({
            provider,
            signer,
            BridgeKaicontract: BridgeKaicontract,
            BridgeKaiBPcontract: BridgeKaiBPcontract,
            userAdd: userAddress,
          });
          
        } else {
          console.error('No wallet found!');
        }
      } catch (error) {
        console.error('Failed to initialize web3:', error);
      }
    };

    initializeWeb3();
  }, []);

  return web3State;
}



export async function burnFromKAI(web3State,from,amt) {
  // Function to mint an NFT
  if (!web3State.signer || !web3State.contract) {
    console.error('Signer or contract is undefined');
    return;
  }
  
  try {
    // Call the mint function on the contract
    const mintTx = await web3State.BridgeKaicontract.connect(web3State.signer).burn(from,amt);
    const receipt = await mintTx.wait();
    console.log(receipt);
    
} catch (error) {
    console.error('Error in buring from Kai ', error);
}
}
export async function burnFromKAIBP(web3State,from,amt) {
    // Function to mint an NFT
    if (!web3State.signer || !web3State.contract) {
        console.error('Signer or contract is undefined');
        return;
    }
  
    try {
        // Call the mint function on the contract
        const mintTx = await web3State.BridgeKaiBPcontract.connect(web3State.signer).burn(from,amt);
        const receipt = await mintTx.wait();
        console.log(receipt);
        
    } catch (error) {
        console.error('Error in buring from Kai ', error);
    }
}
export async function MintOnKAIBP(web3State,to,amt) {
    // Function to mint an NFT
    if (!web3State.signer || !web3State.contract) {
        console.error('Signer or contract is undefined');
        return;
    }
    
    try {
        // Call the mint function on the contract
        const mintTx = await web3State.BridgeKaiBPcontract.connect(web3State.signer).mint(to,amt);
        const receipt = await mintTx.wait();
        console.log(receipt);
        
    } catch (error) {
        console.error('Error in buring from Kai ', error);
    }
}

export async function MintOnKAI(web3State,to,amt) {
    // Function to mint an NFT
    if (!web3State.signer || !web3State.contract) {
        console.error('Signer or contract is undefined');
        return;
    }
    
    try {
        // Call the mint function on the contract
        const mintTx = await web3State.BridgeKaicontract.connect(web3State.signer).mint(to,amt);
        const receipt = await mintTx.wait();
        console.log(receipt);
        
    } catch (error) {
      console.error('Error in buring from Kai ', error);
    }
  }



