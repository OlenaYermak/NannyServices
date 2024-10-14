import { auth } from '../../firebase.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
// import { clearFavorites } from '../favorite/favoriteSlice.js'; // імпорт дії

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      return {
        email: user.email,
        uid: user.uid,
        displayName: name,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// // Асинхронний thunk для логауту
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, user => {
        if (user) {
          // Додаємо повернення імені користувача
          resolve({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          });
        } else {
          reject(rejectWithValue('User is not logged in'));
        }
      });
    });
  }
);
