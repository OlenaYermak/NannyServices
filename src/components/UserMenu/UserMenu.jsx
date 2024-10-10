import { useDispatch, useSelector } from 'react-redux';
import { FaUserLarge } from 'react-icons/fa6';
import Button from '../Button/Button.jsx';
import { logoutUser } from '../../redux/auth/operations.js';
import { selectUser } from '../../redux/auth/selectors.js';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <div>
        <FaUserLarge />
        <span>{user?.displayName || 'Guest'}</span>
      </div>
      <Button
        text="Logout"
        onClick={handleLogout}
        // className={css.logoutButton}
      />{' '}
    </div>
  );
}
