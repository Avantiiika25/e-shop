import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // ✅ Add item only if it doesn't already exist → push at TOP
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.unshift(action.payload); // keeps new at top
      }
    },

    // ✅ Remove item from wishlist using its ID
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // ✅ Clear entire wishlist
    clearWishlist: (state) => {
      state.items = [];
    },

    // ✅ Optional: Toggle wishlist (add if not exists, else remove)
    toggleWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.unshift(action.payload);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
