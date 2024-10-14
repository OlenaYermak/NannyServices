// export const selectFavorites = state => state.nanny.favorites;

// export const selectShowMore = state => state.nanny.showMore;

export const selectNannies = state => state.nannies.nannies;
export const selectLoading = state => state.nannies.loading;
export const selectError = state => state.nannies.error;
export const selectFilterOption = state => state.nannies.filterOption;
export const selectVisibleCount = state => state.nannies.visibleCount;

// Селектор для отримання всіх нянь
export const selectAllNannies = state => state.nannies.nannies; // Виправлено на state.nannies
