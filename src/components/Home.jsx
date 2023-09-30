import { AiOutlineSetting } from "react-icons/ai";
import { BiDownArrowAlt } from "react-icons/bi";

const home = () => {
  return (
    <div className="bg-[#131313] relative flex justify-center items-center h-screen">
      <div className="bg-[#211621] absolute h-[50%] w-[100%] lg:h-[48%] lg:w-[28%] rounded-[10rem] blur-2xl mt-[-20rem]"></div>
      <div className="bg-[#131313] relative w-full lg:w-[25%] mx-1 border border-gray-800 text-center rounded-3xl py-5 mt-[-15rem]">
        <div className="flex justify-between items-center px-6">
          <div className="flex gap-4 items-center">
            <h1 className="text-white text-[20px] font-[400]">Swap</h1>
            <p className="text-gray-500 text-[16px] font-[600]">Buy</p>
          </div>
          <AiOutlineSetting className="w-6 h-6 text-white" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between bg-[#1B1B1B] text-start px-4 mx-2 py-6 lg:py-3 mt-5 rounded-xl hover:border hover:border-gray-800">
            <div className="text-gray-500">
              <h1 className="text-[16px] font-[700] leading-[20px]">You pay</h1>
              <p className="text-[28px] font-[600]">0</p>
              <p className="text-[16px] font-normal text-gray-400 lg:block hidden">
                $1,660.61
              </p>
            </div>
            <div>
              <select
                className="px-1 ml-10 bg-[#131313] text-white border border-gray-800 py-1 text-[20px] font-[600] rounded-2xl"
                id="schedule"
              >
                <option value="">ETH</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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
              <p className="text-[16px] font-normal text-gray-400 lg:block hidden">
                $1,660.61
              </p>
            </div>
            <div>
              <select
                className="px-2 bg-[#F476FA] text-white border border-white py-1 font-[600] text-[20px] rounded-3xl"
                id="schedule"
              >
                <option value="">Select token</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
          <button className="bg-[#311C31] mt-2 text-[#F275F8] mx-2 px-5 w-[97%] py-2 rounded-2xl font-[700] text-[20px]">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default home;
