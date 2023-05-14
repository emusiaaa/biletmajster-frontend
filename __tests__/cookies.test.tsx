import { render, screen, act } from "@testing-library/react";
import { RegisterForm } from "../components/registration/RegisterForm";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { useApiClient } from "../functions/useApiClient";
import { RecoilRoot, useRecoilState } from "recoil";
import { CookieManager } from "../components/CookieManager";
import { useCookies } from "../functions/useCookies";
import { backendUrlState } from "../recoil/backendUrlState";
import { sessionTokenState } from "../recoil/sessionTokenState";

const setup = () => {
  const user = userEvent.setup();

  document.cookie =
    "backendUrl=sampleUrl; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/";
  document.cookie =
    "sessionToken=sampleToken; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/";

  const TestComponent = () => {
    const [url, setUrl] = useRecoilState(backendUrlState);
    const [token, setToken] = useRecoilState(sessionTokenState);
    useCookies();

    return (
      <>
        <p>URL is {url}</p>
        <p>Token is {token}</p>
        <input
          data-testid="urlChange"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          data-testid="tokenChange"
          value={token ?? ""}
          onChange={(e) => setToken(e.target.value)}
        />
      </>
    );
  };

  return { user, TestComponent };
};

describe("Cookie", () => {
  it("is properly read", () => {
    const { TestComponent } = setup();

    render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    );

    expect(screen.getByText("URL is sampleUrl")).toBeInTheDocument();
    expect(screen.getByText("Token is sampleToken")).toBeInTheDocument();
  }),
    it("is properly modified", async () => {
      const { user, TestComponent } = setup();

      render(
        <RecoilRoot>
          <TestComponent />
        </RecoilRoot>
      );

      await act(async () => {
        await user.clear(screen.getByTestId("urlChange"));
        await user.clear(screen.getByTestId("tokenChange"));
        await user.type(screen.getByTestId("urlChange"), "modifiedUrl");
        await user.type(screen.getByTestId("tokenChange"), "modifiedToken");
      });

      expect(document.cookie.includes("backendUrl=modifiedUrl")).toBeTruthy();
      expect(
        document.cookie.includes("sessionToken=modifiedToken")
      ).toBeTruthy();
    });
});
