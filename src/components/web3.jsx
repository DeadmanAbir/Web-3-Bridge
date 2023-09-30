import {ethers} from "ethers";
import BridgeKaiABI from "../abis/BridgeKai.json";
import BridgeKaiBPABI from "../abis/BridgeKaiBP.json";
import kbpToken from "../abis/KaiBPToken.json";
import kaiToken from "../abis/KaiToken.json"
import { useState,useEffect } from 'react';


export async function burnFromKAIBP(web3State,from,amt) {
  // Function to mint an NFT
  if (!web3State.signer || !web3State.BridgeKaiBPcontract) {
    console.error('Signer or contract is undefined');
    return;
  }

  try {
    const approveTx = await web3State.KaiBPcontract.connect(web3State.signer).approve(
      web3State.BridgeKaiBPcontract.target,
      amt
    );
    const approveReceipt = await approveTx.wait();
  console.log("approve", approveReceipt);
    // Check if the approval transaction was successful
    if (approveReceipt.status !== 1) {
      console.error('Approval transaction failed');
      return;
    }
    // Call the mint function on the contract
    const mintTx = await web3State.BridgeKaiBPcontract.connect(web3State.signer).burn(from,amt);
    const receipt = await mintTx.wait();
    // console.log(receipt);
    console.log("Sucessfully burn KaiBP :",amt)
    
  } catch (error) {
    console.error('Error in buring from KaiBP ', error);
    }
  }


export async function burnFromKAI(web3State,from,amt) {
  // Function to mint an NFT
  if (!web3State.signer || !web3State.BridgeKaicontract) {
    console.error('Signer or contract is undefined');
    return;
  }

  try {
    const approveTx = await web3State.Kaicontract.connect(web3State.signer).approve(
      web3State.BridgeKaicontract.target,
      amt
    );
    const approveReceipt = await approveTx.wait();
  console.log("approve", approveReceipt);
    // Check if the approval transaction was successful
    if (approveReceipt.status !== 1) {
      console.error('Approval transaction failed');
      return;
    }
    // Call the mint function on the contract
    const mintTx = await web3State.BridgeKaicontract.connect(web3State.signer).burn(from,amt);
    const receipt = await mintTx.wait();
    // console.log(receipt);
    console.log("Sucessfully burn Kai :",amt)
    
  } catch (error) {
    console.error('Error in buring from Kai ', error);
    }
  }






export async function MintOnKAIBP(web3State,to,amt) {
    // Function to mint an NFT
    if (!web3State.signer || !web3State.BridgeKaiBPcontract) {
        console.error('Signer or contract is undefined');
        return;
      }
    
    try {
      // Call the mint function on the contract
      const mintTx = await web3State.BridgeKaiBPcontract.connect(web3State.signer).mint(to,amt);
      const receipt = await mintTx.wait();
      // console.log(receipt);
      console.log("Sucessfully mint KaiBP :",amt)
      
    } catch (error) {
      console.error('Error in minting on KaiBP ', error);
    }
}

export async function MintOnKAI(web3State,to,amt) {
    // Function to mint an NFT
    if (!web3State.signer || !web3State.BridgeKaicontract) {
      console.error('Signer or contract is undefined');
        return;
    }
    
    try {
      // Call the mint function on the contract
      const mintTx = await web3State.BridgeKaicontract.connect(web3State.signer).mint(to,amt);
      const receipt = await mintTx.wait();
      // console.log(receipt);
      console.log("Sucessfully mint Kai :",amt)
      
    } catch (error) {
      console.error('Error in minting on Kai ', error);
    }
  }



