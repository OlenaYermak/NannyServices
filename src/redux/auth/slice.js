import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from './operations.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    const pendingReducer = state => {
      state.isLoading = true;
      state.error = null;
    };

    const rejectedReducer = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    };

    // Реєстрація користувача
    builder
      .addCase(registerUser.pending, pendingReducer)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, rejectedReducer);

    // Логінізація користувача
    builder
      .addCase(loginUser.pending, pendingReducer)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, rejectedReducer);

    // Логаут користувача
    builder
      .addCase(logoutUser.pending, pendingReducer)
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, rejectedReducer);

    // Отримання поточного користувача
    builder
      .addCase(getCurrentUser.pending, pendingReducer)
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, rejectedReducer);
  },
});

export default authSlice.reducer;
