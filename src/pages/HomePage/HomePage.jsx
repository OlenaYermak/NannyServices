// import { useState } from 'react';
// import Modal from 'react-modal';

// import Header from '../../components/Header/Header.jsx';
// import HeroSection from '../../components/HeroSection/HeroSection.jsx';
// import RegistrationLogInForm from '../../components/RegistrationLogInForm/RegistrationLogInForm.jsx';

// Modal.setAppElement('#root');

// export default function HomePage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isRegistration, setIsRegistration] = useState(true); // Додати стан для типу форми

//   const openModal = registration => {
//     setIsRegistration(registration); // Встановлюємо, яку форму показувати
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Header onOpenModal={openModal} />
//       <HeroSection />

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Registration / Log In Form"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             transform: 'translate(-50%, -50%)',
//             width: '400px', // Ширина модального вікна
//             padding: '20px',
//           },
//         }}
//       >
//         <RegistrationLogInForm isRegistration={isRegistration} />
//       </Modal>
//     </>
//   );
// }
import { useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import ModalWindow from '../../components/ModalWindow/ModalWindow.jsx'; // Імпортуємо ModalComponent
import AppBar from '../../components/AppBar/AppBar.jsx';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistration, setIsRegistration] = useState(true); // Додати стан для типу форми

  const openModal = registration => {
    setIsRegistration(registration); // Встановлюємо, яку форму показувати
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header onOpenModal={openModal} />
      <HeroSection />

      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        isRegistration={isRegistration}
      />
    </>
  );
}
