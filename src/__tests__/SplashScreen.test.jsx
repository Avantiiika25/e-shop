import { render, screen } from '@testing-library/react';
import SplashScreen from '../components/SplashScreen';

describe('SplashScreen Component', () => {
  test('renders logo, heading and subheading', () => {
    render(<SplashScreen />);

    // Check for logo by alt text
    expect(screen.getByAltText(/e-shop logo/i)).toBeInTheDocument();

    // Check for main heading text
    expect(screen.getByText(/winter sale is live/i)).toBeInTheDocument();

    // Check for subheading text
    expect(
      screen.getByText(/winter wonders await – shop the chill, grab the thrill/i)
    ).toBeInTheDocument();
  });
});
