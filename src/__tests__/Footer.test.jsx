import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  test('shows success message for valid email subscription', () => {
    render(<Footer />);

    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    // safer: get subscribe button by role AND visible label
    const subscribeButton = screen.getByRole('button', { name: /^subscribe$/i });
    fireEvent.click(subscribeButton);

    expect(screen.getByText(/subscribed successfully/i)).toBeInTheDocument();
  });
});
