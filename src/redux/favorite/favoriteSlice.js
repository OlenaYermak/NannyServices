// import { createSlice } from '@reduxjs/toolkit';

// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState: [],
//   reducers: {
//     addFavorite: (state, action) => {
//       state.push(action.payload);
//     },
//     removeFavorite: (state, action) => {
//       return state.filter(id => id !== action.payload);
//     },
//   },
// });

// export const { addFavorite, removeFavorite } = favoritesSlice.actions;
// export default favoritesSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = [];

// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState,
//   reducers: {
//     addFavorite: (state, action) => {
//       state.push(action.payload);
//     },
//     removeFavorite: (state, action) => {
//       return state.filter(id => id !== action.payload);
//     },
//     loadFavorites: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// export const { addFavorite, removeFavorite, loadFavorites } =
//   favoritesSlice.actions;
// export default favoritesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../auth/operations.js';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      return state.filter(id => id !== action.payload);
    },
    loadFavorites: (state, action) => {
      return action.payload;
    },
    clearFavorites: () => {
      return []; // Очищаємо список обраних
    },
  },
});

export const { addFavorite, removeFavorite, loadFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
