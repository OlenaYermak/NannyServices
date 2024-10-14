// export const ADD_FAVORITE = 'ADD_FAVORITE';
// export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
// export const TOGGLE_SHOW_MORE = 'TOGGLE_SHOW_MORE';

// export const addFavorite = nanny => ({
//   type: ADD_FAVORITE,
//   payload: nanny,
// });

// export const removeFavorite = nanny => ({
//   type: REMOVE_FAVORITE,
//   payload: nanny,
// });

// export const toggleShowMore = localId => ({
//   type: TOGGLE_SHOW_MORE,
//   payload: localId,
// });

import { ref, get } from 'firebase/database';
import { database } from '../../firebase.js';
import { setNannies, setLoading, setError } from './nannySlice';

export const fetchNannies = () => async dispatch => {
  dispatch(setLoading(true)); // Починаємо завантаження
  try {
    const nanniesRef = ref(database, '/');
    const snapshot = await get(nanniesRef);

    if (snapshot.exists()) {
      const nanniesData = snapshot.val();
      dispatch(setNannies(Object.values(nanniesData)));
    } else {
      dispatch(setError('No data available'));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false)); // Завершуємо завантаження
  }
};
