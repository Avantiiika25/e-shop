import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';

import HomePage from './pages/HomePage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import FAQ from './components/FAQ';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ PrivateRoute wrapper to protect routes
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Hide FAQ on login & register pages
  const hideFAQ = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="fade-in">
          {/* ✅ Pass searchQuery handler to Header */}
          <Header setSearchQuery={setSearchQuery} />

          <Routes>
            {/* ✅ Public Routes */}
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ✅ Protected Routes */}
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />

            {/* ✅ FIXED: Match Header favorites link → /wishlist */}
            <Route
              path="/wishlist"
              element={
                <PrivateRoute>
                  <WishlistPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/success"
              element={
                <PrivateRoute>
                  <SuccessPage />
                </PrivateRoute>
              }
            />

            {/* ✅ Optional: Catch-all 404 page */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>

          {/* ✅ Show FAQ except login/register */}
          {!hideFAQ && <FAQ />}
          <Footer />

          {/* ✅ Toast Notification */}
          <ToastContainer position="top-right" autoClose={1500} theme="colored" />
        </div>
      )}
    </>
  );
};

export default App;
