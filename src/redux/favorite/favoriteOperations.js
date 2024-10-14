// // import {
// //   addFavoriteNanny,
// //   removeFavoriteNanny,
// //   loadFavorites,
// // } from './favoriteSlice';

// // export const addNannyToFavorites = nanny => dispatch => {
// //   dispatch(addFavoriteNanny(nanny));
// // };

// // export const deleteNannyFromFavorites = id => dispatch => {
// //   dispatch(removeFavoriteNanny(id));
// // };

// // export const loadNanniesFromLocalStorage = () => dispatch => {
// //   const storedFavorites = JSON.parse(localStorage.getItem('favoriteNannies'));
// //   if (storedFavorites) {
// //     dispatch(loadFavorites(storedFavorites));
// //   }
// // };

import { createAsyncThunk } from '@reduxjs/toolkit';

// export const addNannyToFavorites = createAsyncThunk(
//   'favorites/addNannyToFavorites',
//   // async (nanny, { getState }) => { //was
//   async (nannyId, { getState }) => {
//     const state = getState();
//     const currentUser = state.auth.user;

//     if (!currentUser) throw new Error('User is not logged in');

//     let favorites = JSON.parse(localStorage.getItem(currentUser.uid)) || [];
//     if (!favorites[currentUser.uid]) {
//       favorites[currentUser.uid] = [];
//     }

//     favorites.push(nannyId);

//     localStorage.setItem(currentUser.uid, JSON.stringify(favorites));

//     return nannyId; // Повертаємо няню для додавання в Redux
//   }
// );

export const addNannyToFavorites = createAsyncThunk(
  'favorites/addNannyToFavorites',
  async (nannyId, { getState }) => {
    const state = getState();
    const currentUser = state.auth.user;

    if (!currentUser) throw new Error('User is not logged in');

    let favorites = JSON.parse(localStorage.getItem(currentUser.uid)) || [];

    // Перевіряємо, чи няня вже є в обраних
    if (!favorites.includes(nannyId)) {
      favorites.push(nannyId);
    }

    localStorage.setItem(currentUser.uid, JSON.stringify(favorites));

    return nannyId;
  }
);

export const deleteNannyFromFavorites = createAsyncThunk(
  'favorites/deleteNannyFromFavorites',
  async (nannyId, { getState }) => {
    const state = getState();
    const currentUser = state.auth.user;

    if (!currentUser) throw new Error('User is not logged in');

    let favorites = JSON.parse(localStorage.getItem(currentUser.uid)) || [];

    // Видаляємо nannyId з масиву
    favorites = favorites.filter(id => id !== nannyId);

    localStorage.setItem(currentUser.uid, JSON.stringify(favorites));

    return nannyId; // Повертаємо nannyId для видалення з Redux
  }
);

// Операція завантаження обраних нянь з localStorage після авторизації
export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (_, { getState }) => {
    const state = getState();
    const currentUser = state.auth.user;
    let favorites = JSON.parse(localStorage.getItem(currentUser.uid)) || {};

    return favorites[currentUser.uid] || []; // Повертаємо масив обраних для цього користувача
  }
);

// export const syncFavoritesWithLocalStorage = favorites => dispatch => {
//   favorites.forEach(favorite => {
//     dispatch(addNannyToFavorites(favorite));
//   });
// };
