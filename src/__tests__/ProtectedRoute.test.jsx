import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../components/ProtectedRoute';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';

const renderWithRouterAndRedux = (initialState) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: initialState },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('ProtectedRoute', () => {
  test('redirects to login if no token is present', () => {
    renderWithRouterAndRedux({ token: null });

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  test('renders protected content if token is present', () => {
    renderWithRouterAndRedux({ token: 'sample_token' });

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });
});
