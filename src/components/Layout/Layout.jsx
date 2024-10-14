import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../redux/modal/modalSlice';
import {
  selectIsModalOpen,
  selectIsRegistration,
} from '../../redux/modal/modalSelectors.js';
import { Toaster } from 'react-hot-toast';

import AppBar from '../AppBar/AppBar.jsx';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const isRegistration = useSelector(selectIsRegistration);

  const handleOpenModal = isRegistration => {
    dispatch(openModal(isRegistration));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <AppBar onOpenModal={handleOpenModal} />
      {children}
      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        isRegistration={isRegistration}
      />
      <Toaster position="top-center" />
    </>
  );
}
