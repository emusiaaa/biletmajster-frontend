import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { backendUrlState, urls } from "../recoil/backendUrlState";
import { firstLoadState } from "../recoil/firstLoadState";
import { sessionTokenState } from "../recoil/sessionTokenState";
import Cookies from "js-cookie";
import { Api } from "../api/Api";

export const useCookies = () => {
  const [firstLoad, setFirstLoad] = useRecoilState(firstLoadState);
  const [backendUrl, setBackendUrl] = useRecoilState(backendUrlState);
  const [sessionToken, setSessionToken] = useRecoilState(sessionTokenState);

  // on first load, get sessionToken and apiUrl from cookie
  useEffect(() => {
    if (!firstLoad) {
      const newUrl = Cookies.get("backendUrl");
      const token = Cookies.get("sessionToken");
      //console.log("First load values: " + newUrl + ", " + token);
      if (newUrl !== undefined) setBackendUrl(newUrl);
      if (token !== undefined) setSessionToken(token);
      setFirstLoad(true);
    }
  }, [firstLoad]);

  // on backend url change
  useEffect(() => {
    if (firstLoad) {
      //console.log("BackendUrl changed to " + backendUrl);
      Cookies.set("backendUrl", backendUrl);
    }
  }, [firstLoad, backendUrl]);

  // on session token change
  useEffect(() => {
    if (firstLoad) {
      //console.log("sessionToken changed to " + sessionToken);
      if (sessionToken === undefined) Cookies.remove("sessionToken");
      else Cookies.set("sessionToken", sessionToken);
    }
  }, [firstLoad, sessionToken]);
};
