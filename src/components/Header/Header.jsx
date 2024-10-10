import Logo from '../Logo/Logo.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import Button from '../Button/Button.jsx';

export default function Header({ onOpenModal }) {
  return (
    <header>
      <p>HEADER</p>
      <Logo />
      <Navigation />
      <Button text="Log In" onClick={() => onOpenModal(false)} />
      <Button text="Registration" onClick={() => onOpenModal(true)} />
    </header>
  );
}
