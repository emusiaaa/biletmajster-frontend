import { atom } from "recoil";

export const sessionTokenState = atom<string | undefined>({
    key: "sessionTokenState",
    default: undefined
})