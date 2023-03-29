import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { RegisterCard } from '../components/registration'

describe('RegisterCard', () => {
  it('renders empty registration form', () => {
    // mock recoil state

    render(
      <RecoilRoot>
        <RegisterCard />
      </RecoilRoot>
    );

    expect(screen.getByText('Organizer name')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  })
})
