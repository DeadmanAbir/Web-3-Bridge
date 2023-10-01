import { AiOutlineSetting } from "react-icons/ai";
import { BiDownArrowAlt } from "react-icons/bi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getAddress } from "../Store/Getters";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { wallet } from "../Store/Variables";
import BridgeKaiABI from "../abis/BridgeKai.json";
import BridgeKaiBPABI from "../abis/BridgeKaiBP.json";
import kaiToken from "../abis/KaiToken2.json";
import kbpToken from "../abis/KaiBPToken2.json";
import { ToastContainer, toast } from 'react-toastify';
import Web3 from 'web3';

import 'react-toastify/dist/ReactToastify.css';
import { burnFromKAIBP, MintOnKAI, MintOnKAIBP, burnFromKAI } from "./web3";
const home = () => {
  const walletAddress = useRecoilValue(getAddress);
  const setWalletAddress = useSetRecoilState(wallet);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const notifySuccess = (successText) => toast.success(successText);
  const notifyError = (errorText) => toast.error(errorText);
  useEffect(() => {
    getCurrent(setWalletAddress);
    newWallet(setWalletAddress);
  })



  const [web3State, setWeb3State] = useState({
    provider: null,
    signer: undefined,
    BridgeKaicontract: undefined,
    BridgeKaiBPcontract: undefined,
    Kaicontract:undefined,
    KaiBPcontract:undefined,
    userAdd: "",
    web3:undefined,
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
          const BridgeKaicontractAddress = "0x9741ff9Ac44Ba276d386a76f272E549334F01D3b";
          const BridgeKaiBPcontractAddress = "0xC240F9b96Fa482f9478038B98Dea4456d3d4E6F2";
          const kbpTokenad = "0x7673f5e21A5e37A3fa2Ffaaee2E32A07C912fe75";
          const kaiTokenad = "0x4C0b3a14E6Cdd45Aac3d287969336EA7a765d20a"
          const BridgeKaicontract = new ethers.Contract(BridgeKaicontractAddress,BridgeKaiABI, signer);
          const BridgeKaiBPcontract = new ethers.Contract(BridgeKaiBPcontractAddress,BridgeKaiBPABI, signer);
          const Kaicontract = new ethers.Contract(kaiTokenad,kbpToken, signer);
          const KaiBPcontract = new ethers.Contract(kbpTokenad,kaiToken, signer);

          let accounts = await provider.send("eth_requestAccounts", []);
          let userAddress = accounts[0];

          // Update the web3 state
          const web3 = new Web3(provider);
          setWeb3State({
            provider,
            signer,
            BridgeKaicontract: BridgeKaicontract,
            BridgeKaiBPcontract: BridgeKaiBPcontract,
            Kaicontract:Kaicontract,
            KaiBPcontract:KaiBPcontract,
            userAdd: userAddress,
            web3:web3,
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
  }, []);

  // return web3State;





  async function handleSwap() {
    console.log(web3State)
    if (fromToken == toToken) {
      notifyError("You can't swap between two tokens");
      return
    }
    if (!fromAmount) {
      return notifyError("Please select some amount");
    }
    let weiAmount = 0;
    if (fromToken == "KAI-BEP20") {
      weiAmount = web3State.web3.utils.toWei(fromAmount.toString(), 'ether');
      try {
        const response = await burnFromKAIBP(web3State, walletAddress, weiAmount);
        console.log(response);
        const mint = await MintOnKAI(web3State, walletAddress, weiAmount);
        return notifySuccess("Transaction successful");
      } catch (e) {
        console.log(e);
        return notifyError("Soe error occured");
      }
    } else {
      try {
        const response = await burnFromKAI(web3State, walletAddress, weiAmount );
        const mint = await MintOnKAIBP(web3State, walletAddress,  weiAmount);
        return notifySuccess("Transaction Successful")
      } catch (e) {
        console.log(e);
        return notifyError("Some error occured")
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
              <h1 className="text-[16px] font-[700] leading-[20px]" >You pay</h1>
              <input type="text" placeholder="0" className="text-[28px] font-[600] w-[50%] bg-[#1B1B1B] outline-none" onChange={(e) => {
                setFromAmount(e.target.value);
              }}></input>
              {/* <p className="text-[16px] font-normal text-gray-400 lg:block hidden">
                $1,660.61
              </p> */}
            </div>
            <div>
              <select
                className="px-1 ml-10 bg-[#131313] text-white border border-gray-800 py-1 text-[20px] font-[600] rounded-2xl"
                id="schedule"
                onChange={(e) => {
                  setFromToken(e.target.value);
                }}
              >
                <option >Select...</option>
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
              <p  className="text-[28px] font-[600] w-[50%] bg-[#1B1B1B] outline-none" 
              ></p>
              {/* <p className="text-[16px] font-normal text-gray-400 lg:block hidden">
                $1,660.61
              </p> */}
            </div>
            <div>
              <select
                className="px-2 bg-[#F476FA] text-white border border-white py-1 font-[600] text-[20px] rounded-3xl"
                id="schedule"
                onChange={(e) => {
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
            {walletAddress.length > 0 ? ("Swap") : ("Connect Wallet")}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
};

export default home;


async function getCurrent(setWalletAddress) {
  if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setWalletAddress({
          address: accounts[0]
        });
        console.log(accounts[0]);
      } else {
        console.log("Connect with metamask");
      }
    } catch (e) {
      console.log(e);
    }
  }
}


async function newWallet(setWalletAddress) {
  if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
    window.ethereum.on("accountsChanged", (accounts) => {
      setWalletAddress({ address: accounts[0] });
    })
  } else {
    setWalletAddress("");
    console.log("please install metamask");
  }
}