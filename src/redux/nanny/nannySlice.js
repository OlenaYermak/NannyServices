// // import { createSlice } from '@reduxjs/toolkit';
// // // import {
// // //   addFavorite,
// // //   removeFavorite,
// // //   toggleShowMore,
// // // } from './nannyOperations.js';

// // const initialState = {
// //   favorites: [],
// //   // showMore: {}, // Об'єкт для зберігання стану showMore
// // };

// // const nannySlice = createSlice({
// //   name: 'nanny',
// //   initialState,
// //   reducers: {
// //     toggleFavorite(state, action) {
// //       const index = state.favorites.indexOf(action.payload);
// //       if (index !== -1) {
// //         state.favorites.splice(index, 1);
// //       } else {
// //         state.favorites.push(action.payload);
// //       }
// //     },
// //   },
// // });

// // export const { toggleFavorite } = nannySlice.actions;
// // export default nannySlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   favorites: JSON.parse(localStorage.getItem('favorites')) || [], // Отримуємо фаворити з localStorage
// };

// // const nannySlice = createSlice({
// //   name: 'nanny',
// //   initialState,
// //   reducers: {
// //     toggleFavorite(state, action) {
// //       const index = state.favorites.indexOf(action.payload);
// //       if (index !== -1) {
// //         state.favorites.splice(index, 1);
// //       } else {
// //         state.favorites.push(action.payload);
// //       }
// //       // Оновлюємо localStorage після зміни фаворитів
// //       localStorage.setItem('favorites', JSON.stringify(state.favorites));
// //     },
// //   },
// // });

// const nannySlice = createSlice({
//   name: 'nanny',
//   initialState,
//   reducers: {
//     toggleFavorite(state, action) {
//       const nannyIndex = action.payload;

//       if (nannyIndex == null) {
//         console.error(
//           'Cannot toggle favorite: nanny index is null or undefined'
//         );
//         return;
//       }

//       const index = state.favorites.indexOf(nannyIndex);
//       if (index !== -1) {
//         state.favorites.splice(index, 1);
//       } else {
//         state.favorites.push(nannyIndex);
//       }
//     },
//   },
// });

// export const { toggleFavorite } = nannySlice.actions;
// export default nannySlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const nannySlice = createSlice({
  name: 'nannies',
  initialState: {
    nannies: [],
    loading: false,
    error: null,
    filterOption: 'AtoZ', // Поле для фільтра
    visibleCount: 3, // Кількість видимих нянь
  },
  reducers: {
    setFilterOption: (state, action) => {
      state.filterOption = action.payload;
    },
    loadMoreNannies: state => {
      state.visibleCount += 3;
    },
    setNannies: (state, action) => {
      state.nannies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFilterOption, // Залишайте цю назву
  loadMoreNannies,
  setNannies,
  setLoading,
  setError,
} = nannySlice.actions;

export default nannySlice.reducer;
