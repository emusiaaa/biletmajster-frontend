import { atom } from "recoil";

export const freshIdState = atom<string | undefined>({
  key: "freshIdState",
  default: undefined,
});
