// // import { useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import NannyList from '../../components/NannyList/NannyList.jsx';
// // import Button from '../../components/Button/Button.jsx';
// // import { selectCurrentUser } from '../../redux/auth/selectors.js';
// // import {
// //   selectFavorites,
// //   // selectLoading,
// //   selectFavoritesError,
// // } from '../../redux/favorite/favoriteSelectors.js';
// // import { loadFavorites } from '../../redux/favorite/favoriteSlice.js';
// // // import css from './FavoritesPage.module.css';

// // export default function FavoritesPage() {
// //   const dispatch = useDispatch();
// //   const favorites = useSelector(selectFavorites);
// //   // const loading = useSelector(selectLoading);
// //   const error = useSelector(selectFavoritesError);
// //   const user = useSelector(selectCurrentUser);

// //   useEffect(() => {
// //     dispatch(loadFavorites());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (user) {
// //       const storedFavorites = JSON.parse(localStorage.getItem(user.uid)) || [];
// //       if (storedFavorites.length > 0) {
// //         dispatch(loadFavorites(storedFavorites));
// //       }
// //     }
// //   }, [user, dispatch]);

// //   // if (loading) {
// //   //   return <p>Loading...</p>;
// //   // }

// //   console.log('Favorites:', favorites);

// //   if (error) {
// //     return <p>Error loading favorites: {error}</p>;
// //   }

// //   if (favorites.length === 0) {
// //     return <p>You don't have any favorites yet.</p>;
// //   }

// //   return (
// //     <div className={css.favoritesPage}>
// //       <h1>Your Favorite Nannies</h1>
// //       <NannyList nannies={favorites} />
// //     </div>
// //   );
// // }

// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import NannyList from '../../components/NannyList/NannyList.jsx';
// import { selectCurrentUser } from '../../redux/auth/selectors.js';
// // import {
// //   selectFavorites,
// //   // selectLoading,
// //   selectFavoritesError,
// // } from '../../redux/favorite/favoriteSelectors.js';
// import { loadFavorites } from '../../redux/favorite/favoriteSlice.js';
// // import css from './FavoritesPage.module.css';

// export default function FavoritesPage() {
//   const dispatch = useDispatch();
//   // const favorites = useSelector(selectFavorites);
//   // const loading = useSelector(selectLoading);
//   // const error = useSelector(selectFavoritesError);
//   const user = useSelector(selectCurrentUser);

//   useEffect(() => {
//     if (user) {
//       console.log('User is logged in:', user);
//       const userFavoritesKey = user.uid; // Ключ для user.uid
//       const storedFavorites = localStorage.getItem(userFavoritesKey);

//       // Логування для перевірки вмісту localStorage
//       console.log('Stored favorites:', storedFavorites);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       const storedFavorites = JSON.parse(localStorage.getItem(user.uid)) || [];
//       if (storedFavorites.length > 0) {
//         dispatch(loadFavorites(storedFavorites));
//       }
//     }
//   }, [user, dispatch]);

//   // useEffect(() => {
//   //   if (user) {
//   //     localStorage.setItem(user.uid, JSON.stringify(favorites));
//   //   }
//   // }, [favorites, user]);

//   // useEffect(() => {
//   //   if (user) {
//   //     const userFavoritesKey = user.uid; // Ключ для user.uid
//   //     console.log(userFavoritesKey);
//   //     const storedFavorites = localStorage.getItem(userFavoritesKey);

//   //     // Логування для перевірки вмісту localStorage
//   //     console.log('Stored favorites:', storedFavorites);

//   //   //   if (storedFavorites) {
//   //   //     // Якщо дані є в localStorage, завантажуємо їх
//   //   //     dispatch(loadFavorites(JSON.parse(storedFavorites)));
//   //   //   } else {
//   //   //     // Якщо в localStorage немає даних, можливо, треба показати повідомлення чи запитати сервер
//   //   //     console.log('No favorites in localStorage for this user');
//   //   //   }
//   //   // }
//   // }, [user, dispatch]);

//   // if (loading) {
//   //   return <p>Loading...</p>;
//   // }

//   // if (error) {
//   //   return <p>Error loading favorites: {error}</p>;
//   // }

//   // if (favorites.length === 0) {
//   //   return <p>You don't have any favorites yet.</p>;
//   // }

//   return (
//     <div>
//       <h1>Your Favorite Nannies</h1>
//       <NannyList nannies={storedFavorites} />
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NannyList from '../../components/NannyList/NannyList.jsx';
import { selectCurrentUser } from '../../redux/auth/selectors.js';
import { loadFavorites } from '../../redux/favorite/favoriteSlice.js';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [favoriteNannies, setFavoriteNannies] = useState([]);

  useEffect(() => {
    if (user) {
      console.log('User is logged in:', user);
      const userFavoritesKey = user.uid;
      const storedFavorites = localStorage.getItem(userFavoritesKey);

      if (storedFavorites) {
        const favoritesArray = JSON.parse(storedFavorites); // Перетворюємо рядок у масив
        console.log('Stored favorites:', favoritesArray);
        setFavoriteNannies(favoritesArray); // Зберігаємо у стані favoriteNannies
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log('User is logged in:', user);
      const userFavoritesKey = user.uid;
      const storedFavorites = localStorage.getItem(userFavoritesKey);

      if (storedFavorites) {
        const favoritesArray = JSON.parse(storedFavorites);
        console.log('Stored favorites:', favoritesArray);

        // Перевірте, чи дійсно об'єкти унікальні
        const uniqueNannies = [
          ...new Set(favoritesArray.map(nanny => nanny.nannyId)),
        ];
        console.log('Unique nannies:', uniqueNannies);

        setFavoriteNannies(favoritesArray);
      }
    }
  }, [user]);

  // // Завантажуємо улюблених з localStorage після завантаження компонента
  // useEffect(() => {
  //   if (user) {
  //     console.log('User is logged in:', user);
  //     const userFavoritesKey = user.uid; // Ключ для user.uid
  //     const storedFavorites = localStorage.getItem(userFavoritesKey);

  //     console.log('Stored favorites:', storedFavorites);

  //     //   if (storedFavorites) {
  //     //     const favoritesArray = JSON.parse(storedFavorites); // Перетворюємо рядок у масив
  //     //     // Диспатчимо улюблених у Redux
  //     //     dispatch(loadFavorites(favoritesArray));
  //     //   }
  //   }
  // }, [user, dispatch]);

  return (
    <div>
      <h1>Your Favorite Nannies</h1>
      {/* Перевіряємо, чи є улюблені няні в Redux */}
      {favoriteNannies && favoriteNannies.length > 0 ? (
        <NannyList nannies={favoriteNannies} />
      ) : (
        <p>You don't have any favorites yet.</p>
      )}
    </div>
  );
}
