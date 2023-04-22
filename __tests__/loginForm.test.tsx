import SignIn from '@/components/login/loginForm';
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { useApiClient } from '../functions/useApiClient';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

const apiClient = {
    organizer: {
        loginOrganizer: jest.fn()
    }
}

jest.mock('../api/apiClient', () => ({
    useApiClient: jest.fn(() => apiClient)
}));

const setup = () => {
    const user = userEvent.setup();
    (useRouter as any).mockReturnValue({
        push: jest.fn(path => { })
    })

    render(
        <RecoilRoot>
            <SignIn />
        </RecoilRoot>
    );
    const passwordInput = screen.getByTestId("password").querySelector('input')!;
    const mailInput = screen.getByTestId("email").querySelector('input')!;
    const loginButton = screen.getByTestId("login");
    return { user, passwordInput, mailInput, loginButton };
}

describe('LoginForm', () => {
    it('renders empty login form', () => {
        const { passwordInput, mailInput, loginButton } = setup();
        expect(passwordInput).toBeInTheDocument();
        expect(mailInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    }),

        it('continues when correct e-mail address and password is provided', async () => {
            (apiClient.organizer.loginOrganizer as any).mockImplementation((params: { headers: { email: string, password: string } }) => {
                expect(params.headers.email).toBe("johndoe@example.com");
                expect(params.headers.password).toBe("SampleLongPassword");

                return Promise.resolve({
                    ok: true,
                    data: { id: 123 }
                })
            })

            const { user, passwordInput, mailInput, loginButton } = setup();

            await act(async () => {
                await user.type(mailInput, "johndoe@example.com");
                await user.type(passwordInput, "SampleLongPassword");
                await user.click(loginButton);
            });

            expect(apiClient.organizer.loginOrganizer).toHaveBeenCalled();
        })

    it('detects incorrect email and password', async () => {
        (apiClient.organizer.loginOrganizer as any).mockImplementation((arg0: { email: string, password: string }) => {
            return Promise.resolve({
                ok: false,
                status: 400
            })
        })

        const { user, passwordInput, mailInput, loginButton } = setup();

        await act(async () => {
            await user.type(mailInput, "johndoe@example.com");
            await user.type(passwordInput, "x");
            await user.click(loginButton);
        });

        expect(screen.getByTestId("error")).toBeInTheDocument();
    })
})
