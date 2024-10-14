import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const getNavLinkActiveClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <ul className={css.navList}>
        <li>
          <NavLink to="/" className={getNavLinkActiveClass}>
            Home
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink to="/nannies" className={getNavLinkActiveClass}>
            Nannies
          </NavLink>
        </li>
        <li>
          {' '}
          {isLoggedIn && (
            <NavLink to="/favorites" className={getNavLinkActiveClass}>
              Favorites
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
