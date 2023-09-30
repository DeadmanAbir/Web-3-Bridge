import { atom } from "recoil";

export const wallet=atom({
    key: "a",
    default: {
        address: ''
    }
});
