// // import { createSlice } from '@reduxjs/toolkit';
// // import {
// //   registerUser,
// //   loginUser,
// //   logoutUser,
// //   getCurrentUser,
// // } from './operations.js';

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState: {
// //     user: null,
// //     isLoading: false,
// //     error: null,
// //   },
// //   reducers: {},
// //   extraReducers: builder => {
// //     const pendingReducer = state => {
// //       state.isLoading = true;
// //       state.error = null;
// //     };

// //     const rejectedReducer = (state, action) => {
// //       state.isLoading = false;
// //       state.error = action.payload;
// //     };

// //     // Реєстрація користувача
// //     builder
// //       .addCase(registerUser.pending, pendingReducer)
// //       .addCase(registerUser.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.user = action.payload;
// //       })
// //       .addCase(registerUser.rejected, rejectedReducer);

// //     // Логінізація користувача
// //     builder
// //       .addCase(loginUser.pending, pendingReducer)
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.user = action.payload;
// //       })
// //       .addCase(loginUser.rejected, rejectedReducer);

// //     // Логаут користувача
// //     builder
// //       .addCase(logoutUser.pending, pendingReducer)
// //       .addCase(logoutUser.fulfilled, state => {
// //         state.isLoading = false;
// //         state.user = null;
// //       })
// //       .addCase(logoutUser.rejected, rejectedReducer);

// //     // Отримання поточного користувача
// //     builder
// //       .addCase(getCurrentUser.pending, pendingReducer)
// //       .addCase(getCurrentUser.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.user = action.payload;
// //       })
// //       .addCase(getCurrentUser.rejected, rejectedReducer);
// //   },
// // });

// // export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import {
//   loginUser,
//   logoutUser,
//   registerUser,
//   getCurrentUser,
// } from './operations.js';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null, // Поточний користувач
//     isLoggedIn: false, // Статус авторизації
//     isFetching: false, // Процес завантаження
//     error: null, // Помилки
//   },

//   reducers: {},
//   extraReducers: builder => {
//     builder;
//     builder
//       .addCase(registerUser.pending, state => {
//         state.isFetching = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isFetching = false;
//         state.isLoggedIn = true;
//         state.user = action.payload; // Додаємо користувача після реєстрації
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isFetching = false;
//         state.error = action.payload;
//       })
//       .addCase(loginUser.pending, state => {
//         state.isFetching = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isFetching = false;
//         state.isLoggedIn = true;
//         state.user = action.payload; // Оновлюємо поточного користувача
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isFetching = false;
//         state.error = action.payload;
//       })
//       .addCase(logoutUser.fulfilled, state => {
//         state.user = null;
//         state.isLoggedIn = false; // Вихід з облікового запису
//       })
//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.user = action.payload; // Отримання поточного користувача
//         state.isLoggedIn = true;
//       });
//   },
// });

// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from './operations.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Поточний користувач
    isLoggedIn: false, // Статус авторизації
    isFetching: false, // Процес завантаження
    error: null, // Помилки
    favorites: [], // Список обраних нянь
  },

  reducers: {
    // resetFavorites(state) {
    //   state.favorites = []; // Скидання списку обраних
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isLoggedIn = true;
        state.user = action.payload; // Додаємо користувача після реєстрації
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isLoggedIn = true;
        state.user = action.payload; // Оновлюємо поточного користувача
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.isLoggedIn = false; // Вихід з облікового запису
        state.favorites = []; // Скидаємо список обраних при логауті
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload; // Отримання поточного користувача
        state.isLoggedIn = true;
      });
  },
});

export const { resetFavorites } = authSlice.actions; // Експортуємо екшен

export default authSlice.reducer;
