import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserLarge } from 'react-icons/fa6';
import Button from '../Button/Button.jsx';
import { logoutUser, getCurrentUser } from '../../redux/auth/operations.js';
import { selectUser } from '../../redux/auth/selectors.js';

import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <div className={css.wrapper}>
      <div className={css.userIconNameWrapper}>
        <div className={css.iconWrapper}>
          <FaUserLarge className={css.iconPerson} />
        </div>
        <span className={css.userName}>{user?.displayName || 'Guest'}</span>
      </div>

      <Button text="Logout" onClick={handleLogout} />
    </div>
  );
}
