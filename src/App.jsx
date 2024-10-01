import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import HeroSection from './components/HeroSection/HeroSection';

import './App.css';
import NannyList from './components/NannyList/NannyList';

import RegistrationLogInForm from './components/RegistrationLogInForm/RegistrationLogInForm.jsx';
import Button from './components/Button/Button.jsx';
import Logo from './components/Logo/Logo.jsx';
import Navigation from './components/Navigation/Navigation.jsx';

import HomePage from '../src/pages/HomePage/HomePage.jsx';
import NanniesPage from './pages/NanniesPage/NanniesPage.jsx';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* HEADER START*/}
      <Logo />
      <Navigation />
      {/* HEADER END*/}

      {/*PAGES ROUTES START*/}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nannies" element={<NanniesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/*PAGES ROUTES END*/}

      <Button text="Log In" />
      <Button text="Registration" />
      {/* <RegistrationLogInForm /> */}
      {/* <NannyList /> */}

      <button onClick={handleToggle}>{isOpen ? 'Hide' : 'Show'}</button>
      {isOpen && <p>Now you can see me!</p>}

      <HeroSection />
    </>
  );
}

export default App;
