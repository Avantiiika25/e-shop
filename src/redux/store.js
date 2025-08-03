import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

// ✅ Load persisted state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('eshop_state');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Failed to load state:", error);
    return undefined;
  }
};

// ✅ Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      cart: state.cart,
      wishlist: state.wishlist,
      auth: state.auth,
    });
    localStorage.setItem('eshop_state', serializedState);
  } catch (error) {
    console.error("Failed to save state:", error);
  }
};

const preloadedState = loadState(); // load from storage if available

// ✅ Create Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState,
  devTools: import.meta.env.MODE !== 'production', // Enable DevTools in dev only
});

// ✅ Subscribe to store changes & persist in localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
