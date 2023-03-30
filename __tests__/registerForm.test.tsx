import { render, screen, fireEvent, act } from '@testing-library/react'
import { RegisterForm } from '../components/registration/RegisterForm'
import userEvent from '@testing-library/user-event';
import fetchMock, { FetchMock } from 'jest-fetch-mock';
import { useRouter } from 'next/router';
import { apiClient } from '../api/apiClient';
import { Api } from '../api/Api';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../api/apiClient', () => ({
  apiClient: {
    organizer: {
      signUp: jest.fn()
    }
  }
}));

const setup = () => {
  
  const user = userEvent.setup();
  const nextStepMock = jest.fn(id => { });
  (useRouter as any).mockReturnValue({
    push: jest.fn(path => { })
  })

  const renderedObject = render(
    <RegisterForm goToNext={nextStepMock}/>
  );
  const nameInput = screen.getByTestId("organizer-name");
  const passwordInput = screen.getByTestId("password");
  const mailInput = screen.getByTestId("email");
  const registerButton = screen.getByTestId("register");
  return {
    user, nameInput, passwordInput, mailInput, registerButton, renderedObject, nextStepMock
  }
}

jest.mock('next/router');

beforeAll(() => {
  fetchMock.enableMocks();
})

beforeEach(() => {
  (fetch as any).resetMocks();
})

describe('RegisterCard', () => {
  it('renders empty registration form', () => {
    const { nameInput, passwordInput, mailInput, registerButton } = setup();
    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(mailInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  }),
    
    it('continues when correct name, e-mail address and password is provided', async () => {
      (fetch as FetchMock).mockResponseOnce(async (request) => {
        // const body = request.url;
        const params = new URLSearchParams(request.url);
        console.debug(params);

        expect(body.name).toBe("John Doe");

        return {
          status: 200,
          body: JSON.stringify({ id: 1234 })
        }
      });

      global.fetch = jest.fn(() =>
        Promise.resolve({
        json: () => Promise.resolve({ lalala: "thrthr" })
      })) as any;

      const { user, nameInput, passwordInput, mailInput, registerButton, nextStepMock } = setup();
      
      await act(async () => {
        await user.click(nameInput);
        await user.keyboard("John Doe");
        await user.click(passwordInput);
        await user.keyboard("SampleLongPassword");
        await user.click(mailInput);
        await user.keyboard("johndoe@example.com");
        registerButton.click();
        expect(screen.getByText("Register")).not.toBeInTheDocument();
      });

      await new Promise(resolve => setTimeout(resolve, 100));
      // expect(fetch).toHaveBeenCalled();
      expect(nextStepMock).toHaveBeenCalled();
    })
})
