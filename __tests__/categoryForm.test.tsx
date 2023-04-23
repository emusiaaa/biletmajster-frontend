import { render, screen, act } from '@testing-library/react'

import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { useApiClient } from '../functions/useApiClient';
import { useRecoilState } from 'recoil';
import { sessionTokenState } from '../recoil/sessionTokenState';
import AddCategoryPopUp from '@/components/events/AddCategoryPopUp';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

// we'll have to mock recoil so that it returns a correct value of a sessionToken
jest.mock('recoil', () => ({
    useRecoilState: jest.fn()
}))
jest.mock('../recoil/sessionTokenState', () => ({
    sessionTokenState: undefined // nothing, really
}))

const apiClient = {
    categories: {
        addCategories: jest.fn()
    }
}

jest.mock('../functions/useApiClient', () => ({
    useApiClient: jest.fn(() => apiClient)
}));

const setup = async () => {
    const user = userEvent.setup();
    (useRouter as any).mockReturnValue({
        push: jest.fn(path => { })
    });

    (useRecoilState as any).mockReturnValue(['mySessionToken', () => { }])

    render(
        <AddCategoryPopUp />
    );
    const openForm = screen.getByTestId("open-form-btn");
    await act(async () => {
        await user.click(openForm);
    });
    // const passwordInput = screen.getByTestId("password").querySelector('input')!;
    const categoryInput = screen.getByTestId("category").querySelector('input')!;
    const cancelButton = screen.getByTestId("cancel-btn");
    const addButton = screen.getByTestId("add-category-btn");
    return { user, categoryInput, cancelButton, addButton };
}

describe('AddCategoryPopUp', () => {
    it('renders empty category form', async () => {
        const { categoryInput, cancelButton, addButton } = await setup();
        expect(categoryInput).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    }),
        it('continues when correct category provided', async () => {
            (apiClient.categories.addCategories as any).mockImplementation((requestParams: { headers: { sessionToken: string, categoryName: string } }) => {
                expect(requestParams.headers.sessionToken).toBe("mySessionToken");
                expect(requestParams.headers.categoryName).toBe("Jedzenie");
                return Promise.resolve({
                    ok: true,
                    data: [{ id: 123, name: "Jedzenie" }]
                })
            })
            const { user, categoryInput, cancelButton, addButton } = await setup();

            await act(async () => {
                await user.type(categoryInput, "Jedzenie");
                await user.click(addButton);
            });
            expect(apiClient.categories.addCategories).toHaveBeenCalled();
        })

    it('detects empty category', async () => {
        const { user, categoryInput, cancelButton, addButton } = await setup();
        await act(async () => {
            await user.click(addButton);
        });
        expect(screen.getAllByText((text: string) => text.includes('Please type sth.....'))).toHaveLength(1);
    })
})
