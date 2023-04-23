import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { useApiClient } from '../functions/useApiClient';
import { RecoilRoot } from 'recoil';
import Categories from '@/pages/add-new-event/index';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

const apiClient = {
    event: {
        addEvent: jest.fn()
    },
    categories:{
        getCategories: jest.fn()
    }
}

jest.mock('../functions/useApiClient', () => ({
    useApiClient: jest.fn(() => apiClient)
}));

const setup = () => {
    const user = userEvent.setup();
    const nextStepMock = jest.fn(id => { });
    (useRouter as any).mockReturnValue({
        push: jest.fn(path => { })
    })

    render(
        <RecoilRoot>
            <Categories/>
        </RecoilRoot>
    );
    const titleInput = screen.getByTestId("title-input").querySelector('input')!;
    const nameInput = screen.getByTestId("name-input").querySelector('input')!;
    const longInput = screen.getByTestId("long-input").querySelector('input')!;
    const latInput = screen.getByTestId("lat-input").querySelector('input')!;
    const maxInput = screen.getByTestId("max-input").querySelector('input')!;
    const startTimePicker = screen.getAllByTestId("startTime-picker");
    const endTimePicker = screen.getAllByTestId("endTime-picker");
    const selector = screen.getAllByTestId("select");
    const addButton = screen.getByTestId("add-btn");
    return { user, titleInput, nameInput, longInput, latInput, maxInput, startTimePicker, endTimePicker,
        selector, addButton, nextStepMock };
}

describe('Categories', () => {
    it('renders empty add event form', async () => {
        (apiClient.categories.getCategories as any).mockImplementation(() => {
                    return Promise.resolve({
                        ok: true,
                        data: { id: 123, name:"Kategoria" }
                    })
                })
        const {titleInput, nameInput, longInput, latInput, maxInput, startTimePicker, endTimePicker,
            selector, addButton} = await setup();
        expect(titleInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(longInput).toBeInTheDocument();
        expect(latInput).toBeInTheDocument();
        expect(maxInput).toBeInTheDocument();
        expect(startTimePicker).toBeInTheDocument();
        expect(endTimePicker).toBeInTheDocument();
        expect(selector).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    })
        // it('continues when correct category provided', async () => {
        //     (apiClient.categories.addCategories as any).mockImplementation((arg0: { headers: { sessionToken: string }, categoryName: string}) => {
        //         expect(arg0.categoryName).toBe("Jedzenie");
        //         return Promise.resolve({
        //             ok: true,
        //             data: { id: 123, name:"Jedzenie" }
        //         })
        //     })
        //     const { user, categoryInput, cancelButton, addButton, nextStepMock } = await setup();
        //
        //     await act(async () => {
        //         await user.type(categoryInput, "Jedzenie");
        //         await user.click(addButton);
        //     });
        //     expect(apiClient.categories.addCategories).toHaveBeenCalled();
        //     expect(nextStepMock).toHaveBeenCalled();
        // })

        // it('detects empty category', async () => {
        //     const { user, categoryInput, cancelButton, addButton } = await setup();
        //     await act(async () => {
        //         await user.click(addButton);
        //     });
        //     expect(screen.getAllByText((text: string) => text.includes('Please type sth.....'))).toHaveLength(1);
        // })
})
