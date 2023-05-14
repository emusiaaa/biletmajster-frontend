import { render, screen, act } from "@testing-library/react";
import { RegisterForm } from "../components/registration/RegisterForm";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { useApiClient } from "../functions/useApiClient";
import { RecoilRoot } from "recoil";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const apiClient = {
  organizer: {
    signUp: jest.fn(),
  },
};

jest.mock("../functions/useApiClient", () => ({
  useApiClient: jest.fn(() => apiClient),
}));

const setup = () => {
  const user = userEvent.setup();
  const nextStepMock = jest.fn((id) => {});
  (useRouter as any).mockReturnValue({
    push: jest.fn((path) => {}),
  });

  render(
    <RecoilRoot>
      <RegisterForm goToNext={nextStepMock} />
    </RecoilRoot>
  );
  const nameInput = screen
    .getByTestId("organizer-name")
    .querySelector("input")!;
  const passwordInput = screen.getByTestId("password").querySelector("input")!;
  const mailInput = screen.getByTestId("email").querySelector("input")!;
  const registerButton = screen.getByTestId("register");
  return {
    user,
    nameInput,
    passwordInput,
    mailInput,
    registerButton,
    nextStepMock,
  };
};

describe("RegisterForm", () => {
  it("renders empty registration form", () => {
    const { nameInput, passwordInput, mailInput, registerButton } = setup();
    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(mailInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  }),
    it("continues when correct name, e-mail address and password is provided", async () => {
      (apiClient.organizer.signUp as any).mockImplementation(
        (arg0: { name: string; email: string; password: string }) => {
          expect(arg0.name).toBe("John Doe");
          expect(arg0.email).toBe("johndoe@example.com");
          expect(arg0.password).toBe("SampleLongPassword");

          return Promise.resolve({
            ok: true,
            data: { id: 123 },
          });
        }
      );

      const {
        user,
        nameInput,
        passwordInput,
        mailInput,
        registerButton,
        nextStepMock,
      } = setup();

      await act(async () => {
        await user.type(nameInput, "John Doe");
        await user.type(passwordInput, "SampleLongPassword");
        await user.type(mailInput, "johndoe@example.com");
        await user.click(registerButton);
      });

      expect(apiClient.organizer.signUp).toHaveBeenCalled();
      expect(nextStepMock).toHaveBeenCalled();
    });

  it("detects incorrect name and password", async () => {
    const { user, nameInput, passwordInput, mailInput, registerButton } =
      setup();

    await act(async () => {
      await user.type(nameInput, "x");
      await user.type(passwordInput, "x");
      await user.type(mailInput, "johndoe@example.com");
      await user.click(registerButton);
    });

    expect(
      screen.getAllByText((text: string) => text.includes("should be"))
    ).toHaveLength(2);
  });
});
