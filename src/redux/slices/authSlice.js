import { createSlice } from '@reduxjs/toolkit';

// Load token from localStorage 
const savedToken = localStorage.getItem('token');
const savedEmail = localStorage.getItem('email');

const initialState = {
  token: savedToken || null,
  email: savedEmail || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //LOGIN: Save to Redux + localStorage
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
    },

     //LOGOUT: Clear Redux + localStorage
    logout: (state) => {
      state.token = null;
      state.email = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
