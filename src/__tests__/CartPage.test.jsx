import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../pages/CartPage';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/slices/cartSlice';
import authReducer from '../redux/slices/authSlice';

// Mock cart state
const preloadedState = {
  cart: {
    items: [
      {
        id: 1,
        title: 'Test Product',
        image: 'https://example.com/image.jpg',
        price: 100,
        quantity: 2
      }
    ]
  },
  auth: { token: 'test-token' }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer
  },
  preloadedState
});

const renderWithProviders = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </Provider>
  );

describe('CartPage', () => {
  test('renders cart items and summary', () => {
    renderWithProviders();
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/₹8000/i)).toBeInTheDocument(); // price * 80
    expect(screen.getByText(/Grand Total/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear cart/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });

  test('applies coupon code', () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText(/apply coupon code/i);
    fireEvent.change(input, { target: { value: 'save20' } });
    fireEvent.click(screen.getByText(/apply/i));
    expect(input.value).toBe('save20');
  });
});
