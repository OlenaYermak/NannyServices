import React from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import RegistrationLogInForm from '../RegistrationLogInForm/RegistrationLogInForm.jsx';

import css from './ModalWindow.module.css';
import Paragraph from '../Paragraph/Paragraph.jsx';

Modal.setAppElement('#root');

export default function ModalWindow({
  isOpen,
  onRequestClose,
  isRegistration,
}) {
  const title = isRegistration ? 'Registration' : 'Log In';
  const description = isRegistration
    ? 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'
    : 'Welcome back! Please enter your credentials to access your account and continue your babysitter search.';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Registration / Log In Form"
      className={css.modalContent}
      overlayClassName={css.overlay}
    >
      <button className={css.closeButton} onClick={onRequestClose}>
        <FiX className={css.icon} />
      </button>

      <div className={css.modalInfoWrapper}>
        <h2 className={css.modalTitle}>{title}</h2>
        <Paragraph text={description} />
      </div>
      <RegistrationLogInForm
        isRegistration={isRegistration}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
}
