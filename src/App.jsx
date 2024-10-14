import { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { useEffect } from 'react';
import { getCurrentUser } from './redux/auth/operations.js'; // про поточного користувача
import { useDispatch } from 'react-redux';
import HomePage from '../src/pages/HomePage/HomePage.jsx';
import NanniesPage from './pages/NanniesPage/NanniesPage.jsx';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import Layout from './components/Layout/Layout.jsx';

// import './App.css';

export default function App() {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleToggle = () => {
  //   setIsOpen(!isOpen);
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {/*PAGES ROUTES START*/}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nannies" element={<NanniesPage />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
      {/*PAGES ROUTES END*/}
    </>
  );
}
