import { atom } from "recoil";

export const firstLoadState = atom<boolean>({
  key: "firstLoadState",
  default: false,
});
