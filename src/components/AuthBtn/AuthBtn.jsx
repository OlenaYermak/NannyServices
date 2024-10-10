import Button from '../Button/Button.jsx';

export default function AuthBtn({ onOpenModal }) {
  return (
    <>
      <Button text="Log In" onClick={() => onOpenModal(false)} />
      <Button text="Registration" onClick={() => onOpenModal(true)} />
    </>
  );
}
