import { render, screen, fireEvent } from '@testing-library/react';
import TermsAndConditions from '../components/TermsAndConditions';

describe('TermsAndConditions Modal', () => {
  test('does not render when show is false', () => {
    render(<TermsAndConditions show={false} onClose={() => {}} />);
    expect(screen.queryByText(/terms & conditions/i)).not.toBeInTheDocument();
  });

  test('renders t&c content when show is true', () => {
    render(<TermsAndConditions show={true} onClose={() => {}} />);
    expect(screen.getByText(/terms & conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<TermsAndConditions show={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
