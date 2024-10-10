import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import Logo from '../Logo/Logo.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import UserMenu from '../UserMenu/UserMenu.jsx';
import AuthBtn from '../AuthBtn/AuthBtn.jsx';

export default function AppBar({ onOpenModal }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header>
      <Logo />
      <Navigation />

      {isLoggedIn ? <UserMenu /> : <AuthBtn onOpenModal={onOpenModal} />}
    </header>
  );
}
