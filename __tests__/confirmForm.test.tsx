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

  const user = userEvent.setup();
  const prevStepMock = jest.fn();
  const routerPushMock = jest.fn(path => { });
  (useRouter as any).mockReturnValue({
    push: routerPushMock
  })

  render(
    <ConfirmForm goToPrevious={prevStepMock} />
  );
  const codeInput = screen.getByTestId("verify-code").querySelector('input')!;
  const goBackButton = screen.getByTestId("go-back");
  return { user, codeInput, goBackButton, prevStepMock, routerPushMock };
}

describe('ConfirmForm', () => {
  it('renders empty confirmation form', () => {
    const { codeInput } = setup();
    expect(codeInput).toBeInTheDocument();
  }),

    it('goes back if "Go back" button is clicked', async () => {
      const { user, prevStepMock, goBackButton } = setup();
      expect(goBackButton).toBeInTheDocument();
      await act(async () => {
        await user.click(goBackButton);
      });
      expect(prevStepMock).toHaveBeenCalled();
    }),

    it('redirects user when code is correct', async () => {
      (apiClient.organizer.confirm as any).mockImplementation((arg0: { code: string }) => {
        expect(arg0.code).toBe("123456");
        return Promise.resolve({
          ok: true
        })
      })

      const { user, codeInput, goBackButton, routerPushMock } = setup();

      await act(async () => {
        await user.type(codeInput, "123456");
        await user.click(goBackButton);
      });

      expect(apiClient.organizer.confirm).toHaveBeenCalled();
      expect(routerPushMock).toHaveBeenCalled();
    }),

    it('redirects user when code is correct', async () => {
      (apiClient.organizer.confirm as any).mockImplementation((arg0: { code: string }) => {
        return Promise.resolve({
          ok: false,
          status: 400
        })
      })

      const { user, codeInput, goBackButton, routerPushMock } = setup();

      await act(async () => {
        await user.type(codeInput, "123456");
        await user.click(goBackButton);
      });

      expect(apiClient.organizer.confirm).toHaveBeenCalled();
      expect(routerPushMock).not.toHaveBeenCalled();
      expect(screen.getByText("Error")).toBeInTheDocument();
    })
})
