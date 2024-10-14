// Отримуємо список обраних нянь
export const selectFavorites = state => state.favorites.favorites;

// Отримуємо помилку, якщо вона є
export const selectFavoritesError = state => state.favorites.error;
