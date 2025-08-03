import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // ✅ Add product to cart with correct quantity
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        // If already exists → add selected quantity
        existing.quantity += item.quantity || 1;
      } else {
        // New item → use given quantity (default 1)
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },

    // Remove item by id
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Clear all cart items
    clearCart: (state) => {
      state.items = [];
    },

    // Increase quantity
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    // Decrease quantity 
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
