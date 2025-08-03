import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../components/FAQ';

describe('FAQ Component', () => {
  test('renders all questions', () => {
    render(<FAQ />);
    
    expect(screen.getByText(/how do i place an order/i)).toBeInTheDocument();
    expect(screen.getByText(/what payment methods are accepted/i)).toBeInTheDocument();
    expect(screen.getByText(/can i return my order/i)).toBeInTheDocument();
    expect(screen.getByText(/how can i track my order/i)).toBeInTheDocument();
  });

  test('toggles answer visibility on click', () => {
    render(<FAQ />);
    
    const firstQuestion = screen.getByText(/how do i place an order/i);
    
    // Answer not visible initially
    expect(screen.queryByText(/simply browse products/i)).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(firstQuestion);
    expect(screen.getByText(/simply browse products/i)).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(firstQuestion);
    expect(screen.queryByText(/simply browse products/i)).not.toBeInTheDocument();
  });
});

