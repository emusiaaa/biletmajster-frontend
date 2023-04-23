import { render, screen, act, waitFor } from '@testing-library/react'
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
    categories: {
        getCategories: jest.fn()
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
    });
    (apiClient.categories.getCategories as any).mockImplementation(() => {
        return Promise.resolve({
            ok: true,
            data: [{ id: 123, name: "Kategoria" }]
        })
    })

    act(() => {
        render(
            <RecoilRoot>
                <Categories />
            </RecoilRoot>
        );
    })
    const titleInput = (await screen.findByTestId("title-input")).querySelector('input')!;
    const nameInput = (await screen.findByTestId("name-input")).querySelector('textarea')!;
    const longInput = (await screen.findByTestId("long-input")).querySelector('input')!;
    const latInput = (await screen.findByTestId("lat-input")).querySelector('input')!;
    const maxInput = (await screen.findByTestId("max-input")).querySelector('input')!;
    const timePickerButtons = await screen.findAllByTestId("CalendarIcon");
    const selector = await screen.findByTestId("select");
    const addButton = await screen.findByTestId("add-btn");
    const openFormButton = await screen.findByTestId("open-form-btn");
    return {
        user, titleInput, nameInput, longInput, latInput, maxInput, timePickerButtons,
        selector, addButton, nextStepMock, openFormButton
    };
}

describe('Categories', () => {
    it('renders empty add event form', async () => {
        const { titleInput, nameInput, longInput, latInput, maxInput, timePickerButtons,
            selector, addButton } = await setup();
        expect(titleInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(longInput).toBeInTheDocument();
        expect(latInput).toBeInTheDocument();
        expect(maxInput).toBeInTheDocument();
        expect(timePickerButtons).toHaveLength(2);
        expect(selector).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    })
})
