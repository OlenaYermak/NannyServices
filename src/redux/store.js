import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice.js';
import modalReducer from './modal/modalSlice.js';
import nannyReducer from './nanny/nannySlice.js';
import favoritesReducer from './favorite/favoriteSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    nannies: nannyReducer,
    favorites: favoritesReducer,
  },
});
