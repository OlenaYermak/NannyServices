import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Logo from '../Logo/Logo.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import UserMenu from '../UserMenu/UserMenu.jsx';
import AuthBtn from '../AuthBtn/AuthBtn.jsx';

import css from './AppBar.module.css';

export default function AppBar({ onOpenModal }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={clsx(css.header, {
        [css.homeHeader]: isHomePage,
      })}
    >
      <div className={css.headerElementWrapper}>
        <Link to="/">
          <Logo />
        </Link>
        <Navigation />

        {isLoggedIn ? <UserMenu /> : <AuthBtn onOpenModal={onOpenModal} />}
      </div>
    </header>
  );
}
