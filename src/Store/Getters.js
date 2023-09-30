import { selector } from "recoil";
import { wallet } from "./Variables";
export const getAddress=selector({
    key: "abc",
    get: ({get})=>{
        const  value =get(wallet);
        return value.address;
    }
});