import { render, screen, act } from '@testing-library/react'

import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { useApiClient } from '../functions/useApiClient';
import { RecoilRoot } from 'recoil';
import AddCategoryPopUp from '@/components/events/AddCategoryPopUp';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
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
    const nextStepMock = jest.fn(id => { });
    (useRouter as any).mockReturnValue({
        push: jest.fn(path => { })
    })

    render(
        <RecoilRoot>
            <AddCategoryPopUp/>
        </RecoilRoot>
);
    const openForm = screen.getByTestId("open-form-btn");
    await act(async () => {
        await user.click(openForm);
    });
    // const passwordInput = screen.getByTestId("password").querySelector('input')!;
    const categoryInput = screen.getByTestId("category").querySelector('input')!;
    const cancelButton = screen.getByTestId("cancel-btn");
    const addButton = screen.getByTestId("add-btn");
    return { user, categoryInput, cancelButton, addButton, nextStepMock };
}

describe('AddCategoryPopUp', () => {
    it('renders empty category form', async () => {
        const {categoryInput, cancelButton, addButton} = await setup();
        expect(categoryInput).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    }),
    it('continues when correct category provided', async () => {
        (apiClient.categories.addCategories as any).mockImplementation((arg0: { categoryName: string}) => {
            expect(arg0.categoryName).toBe("Jedzenie");
            return Promise.resolve({
                ok: true,
                data: { id: 123, name:"Jedzenie" }
            })
        })
        const { user, categoryInput, cancelButton, addButton, nextStepMock } = await setup();

        await act(async () => {
            await user.type(categoryInput, "Jedzenie");
            await user.click(addButton);
        });
        expect(apiClient.categories.addCategories).toHaveBeenCalled();
        expect(nextStepMock).toHaveBeenCalled();
    })

    it('detects empty category', async () => {
        const { user, categoryInput, cancelButton, addButton } = await setup();
        await act(async () => {
            await user.click(addButton);
        });
        expect(screen.getAllByText((text: string) => text.includes('Please type sth.....'))).toHaveLength(1);
    })
})
