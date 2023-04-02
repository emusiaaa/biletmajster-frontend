import SignIn from '@/components/login/loginForm';
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { apiClient } from '../api/apiClient';

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

    render(
        <SignIn/>
    );
    const passwordInput = screen.getByTestId("password").querySelector('input')!;
    const mailInput = screen.getByTestId("email").querySelector('input')!;
    const loginButton = screen.getByTestId("login");
    const error = screen.getByTestId("error");
    return { user, passwordInput, mailInput, loginButton, nextStepMock, error };
}

describe('RegisterForm', () => {
    it('renders empty login form', () => {
        const { passwordInput, mailInput, loginButton, nextStepMock, error } = setup();
        expect(passwordInput).toBeInTheDocument();
        expect(mailInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    }),

        it('continues when correct e-mail address and password is provided', async () => {
            (apiClient.organizer.loginOrganizer as any).mockImplementation((arg0: {email: string, password: string }) => {
                expect(arg0.email).toBe("johndoe@example.com");
                expect(arg0.password).toBe("SampleLongPassword");

                return Promise.resolve({
                    ok: true,
                    data: { id: 123 }
                })
            })

            const { user, passwordInput, mailInput, loginButton, nextStepMock, error } = setup();

            await act(async () => {
                await user.type(mailInput, "johndoe@example.com");
                await user.type(passwordInput, "SampleLongPassword");
                await user.click(loginButton);
            });

            expect(apiClient.organizer.loginOrganizer).toHaveBeenCalled();
            expect(nextStepMock).toHaveBeenCalled();
        })

    it('detects incorrect email and password', async () => {
        const { user, passwordInput, mailInput, loginButton, nextStepMock, error} = setup();

        await act(async () => {
            await user.type(mailInput, "johndoe@example.com");
            await user.type(passwordInput, "x");
            await user.click(loginButton);
        });

        expect(error).toBeInTheDocument();
    })
})
