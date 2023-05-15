import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { sessionTokenState } from "../recoil/sessionTokenState";

/**
 * Redirects user if he is logged in (or not).
 * @example
 * ```
 * useRedirect({
 *   ifLoggedIn: "/profile/" + userId,
 *   ifNotLoggedIn: "/login"
 * })
 * ```
 */
export const useRedirect = (arg: {
  ifLoggedIn?: string;
  ifNotLoggedIn?: string;
}) => {
  const tokenState = useRecoilValue(sessionTokenState);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (tokenState === undefined && arg.ifNotLoggedIn !== undefined)
        router.push(arg.ifNotLoggedIn);
      if (tokenState !== undefined && arg.ifLoggedIn !== undefined)
        router.push(arg.ifLoggedIn);
    }
  }, [tokenState, router, arg]);
};
