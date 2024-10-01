import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const getNavLinkActiveClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" className={getNavLinkActiveClass}>
        Home
      </NavLink>
      <NavLink to="/nannies" className={getNavLinkActiveClass}>
        Nannies
      </NavLink>
      <NavLink to="/favorites" className={getNavLinkActiveClass}>
        Favorites
      </NavLink>
    </nav>
  );
}
