import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

import css from './Logo.module.css';

export default function Logo() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={clsx(css.logo, { [css.loggedIn]: isLoggedIn })}>
      Nanny.Services
    </div>
  );
}
