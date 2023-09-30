import { AiOutlineSetting } from "react-icons/ai";
import { BiDownArrowAlt } from "react-icons/bi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getAddress } from "../../../Store/Getters";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { wallet } from "../../../Store/Variables";
import BridgeKaiABI from "../abis/BridgeKai.json";
import BridgeKaiBPABI from "../abis/BridgeKaiBP.json";

import { burnFromKAIBP, MintOnKAI, MintOnKAIBP,  burnFromKAI } from "./web3";
const home = () => {
  const walletAddress=useRecoilValue(getAddress);
  const setWalletAddress=useSetRecoilState(wallet);
  const [fromToken, setFromToken]=useState("");
  const[toToken, setToToken]=useState("");
  useEffect(()=>{
    getCurrent();
    newWallet();
  })



  async function getCurrent(){
    if(typeof window !='undefined' && typeof window.ethereum !='undefined'){
     try{
       const accounts=await window.ethereum.request({method: "eth_requestAccounts"});
       if(accounts.length>0){
         setWalletAddress({
          address: accounts[0]
         });
         console.log(accounts[0]);
       }else{
         console.log("Connect with metamask");
       }
    }catch(e){
     console.log(e);
    }
 }
}

async function newWallet(){
 if(typeof window !='undefined' && typeof window.ethereum !='undefined'){
   window.ethereum.on("accountsChanged", (accounts)=>{
     setWalletAddress({address: accounts[0]});
   })
 }else{
   setWalletAddress("");
   console.log("please install metamask");
 }
}




  const [web3State, setWeb3State] = useState({
    provider: null,
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
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          // Create a contract instance
          const BridgeKaicontractAddress = "0x9135D33304cdC48AAEDe2daD2CCf51D91546CB1F";
          const BridgeKaiBPcontractAddress = "0x9135D33304cdC48AAEDe2daD2CCf51D91546CB1F";
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
          console.log("updating web3State")
        } else {
          console.error('No wallet found!');
        }
      } catch (error) {
        console.error('Failed to initialize web3:', error);
      }
    };

    initializeWeb3();
  },[]);

  // return web3State;





  async function handleSwap() {
    console.log(web3State)
    if (fromToken == toToken) {
      return alert("You can't swap between two tokens");
    } 

    if(fromToken=="KAI-BEP20"){
      try {
        const response = await burnFromKAI(web3State, walletAddress, "100000000000");
        console.log(response);
        const mint = await MintOnKAIBP(web3State, walletAddress, "100000000000");
      } catch (e) {
        console.log(e);
      }
    }else{
      try{
        const response=await burnFromKAIBP(web3State, walletAddress, "100000000000");
        const mint=await MintOnKAI(web3State, walletAddress, "100000000000");
      }catch(e){
        console.log(e);
      }
    }
  }



  return (
    <div className="bg-[#131313] relative flex justify-center items-center h-screen">
      <div className="bg-[#211621] absolute h-[50%] w-[100%] lg:h-[48%] lg:w-[28%] rounded-[10rem] blur-2xl mt-[-20rem]"></div>
      <div className="bg-[#131313] relative w-full lg:w-[25%] mx-1 border border-gray-800 text-center rounded-3xl py-5 mt-[-15rem]">
        <div className="flex justify-between items-center px-6">
          <div className="flex gap-4 items-center">
            <h1 className="text-white text-[20px] font-[400]">Swap</h1>
           
          </div>
          <AiOutlineSetting className="w-6 h-6 text-white" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between bg-[#1B1B1B] text-start px-4 mx-2 py-6 lg:py-3 mt-5 rounded-xl hover:border hover:border-gray-800">
            <div className="text-gray-500">
              <h1 className="text-[16px] font-[700] leading-[20px]">You pay</h1>
              <p className="text-[28px] font-[600]">0</p>
              {/* <p className="text-[16px] font-normal text-gray-400 lg:block hidden">
                $1,660.61
              </p> */}
            </div>
            <div>
              <select
                className="px-1 ml-10 bg-[#131313] text-white border border-gray-800 py-1 text-[20px] font-[600] rounded-2xl"
                id="schedule"
                onChange={(e)=>{
                  setFromToken(e.target.value);
                }}
              >
                <option >KAI</option>
                <option >KAI-BEP20</option>
                <option >Mainnet KAI</option>
                
              </select>
            </div>
          </div>
          <button className="absolute w-10 h-10 flex items-center border-4 border-[#131313] justify-center bg-[#1B1B1B] text-[22px] text-white rounded-lg top-[33%] lg:top-[32%] left-[43%] lg:left-[45%]">
            <BiDownArrowAlt />
          </button>
          <div className="flex items-center justify-between text-start bg-[#1B1B1B] px-4 mx-2 py-6 lg:py-3 mt-1 rounded-xl hover:border hover:border-gray-800">
            <div className="text-gray-500">
              <h1 className="text-[16px] font-[700] leading-[20px]">You pay</h1>
              <p className="text-[28px] font-[600]">0</p>
              {/* <p className="text-[16px] font-normal text-gray-400 lg:block hidden">
                $1,660.61
              </p> */}
            </div>
            <div>
              <select
                className="px-2 bg-[#F476FA] text-white border border-white py-1 font-[600] text-[20px] rounded-3xl"
                id="schedule"
                onChange={(e)=>{
                  setToToken(e.target.value);
                }}
              >
                <option >Select token</option>
                <option >KAI-BEP20</option>
                <option>Mainnet KAI</option>
              </select>
            </div>
          </div>
          <button className="bg-[#311C31] mt-2 text-[#F275F8] mx-2 px-5 w-[97%] py-2 rounded-2xl font-[700] text-[20px]" onClick={handleSwap}>
          {walletAddress.length>0 ?("Swap"): ("Connect Wallet")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default home;
