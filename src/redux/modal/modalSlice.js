import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    isRegistration: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.isRegistration = action.payload;
    },
    closeModal: state => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
