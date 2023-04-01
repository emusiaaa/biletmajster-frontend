import { render, screen, act } from '@testing-library/react'
import { ConfirmForm } from '../components/registration/ConfirmForm'
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { apiClient } from '../api/apiClient';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../api/apiClient', () => ({
  apiClient: {
    organizer: {
      confirm: jest.fn()
    }
  }
}));

const setup = () => {
  (useRouter as any).mockReturnValue({
    push: jest.fn(path => { })
  })

  const user = userEvent.setup();
  const prevStepMock = jest.fn();

  render(
    <ConfirmForm
      id={100}
      goToPrevious={prevStepMock}
    />
  );
  const codeInput = screen.getByTestId("verify-code").querySelector('input')!;
  const confirmButton = screen.getByTestId("confirm");
  const goBackButton = screen.getByTestId("go-back");
  return { user, codeInput, goBackButton, confirmButton, prevStepMock };
}

describe('ConfirmForm', () => {
  it('renders empty confirmation form', () => {
    const { codeInput, goBackButton, confirmButton } = setup();
    expect(codeInput).toBeInTheDocument();
    expect(goBackButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  }),

    it('goes back if "Go back" button is clicked', async () => {
      const { user, prevStepMock, goBackButton } = setup();
      expect(goBackButton).toBeInTheDocument();
      await act(async () => {
        await user.click(goBackButton);
      });
      expect(prevStepMock).toHaveBeenCalled();
    }),

    it('shows message if code is correct', async () => {
      (apiClient.organizer.confirm as any).mockImplementation((id: string, body: { code: string }) => {
        expect(id).toBe("100");
        expect(body.code).toBe("123456");
        return Promise.resolve({
          ok: true
        })
      })

      const { user, codeInput, confirmButton } = setup();

      await act(async () => {
        await user.type(codeInput, "123456");
        await user.click(confirmButton);
      });

      expect(apiClient.organizer.confirm).toHaveBeenCalled();
      expect(screen.getByTestId("success-alert")).toBeInTheDocument();
    }),

    it('shows error when code is incorrect', async () => {
      (apiClient.organizer.confirm as any).mockImplementation((_1: any, _2: any) => {
        return Promise.resolve({
          ok: false,
          status: 400
        })
      })

      const { user, codeInput, confirmButton } = setup();

      await act(async () => {
        await user.type(codeInput, "123456");
        await user.click(confirmButton);
      });

      expect(screen.getByText((text: string) => text.includes("Invalid verification code"))).toBeInTheDocument();
      expect(apiClient.organizer.confirm).toHaveBeenCalled();
    })
})
