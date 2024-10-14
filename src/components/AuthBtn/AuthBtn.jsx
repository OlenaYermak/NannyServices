import Button from '../Button/Button.jsx';
import css from './AuthBtn.module.css';

export default function AuthBtn({ onOpenModal }) {
  return (
    <>
      <ul className={css.listAuthBtn}>
        <li>
          <Button text="Log In" onClick={() => onOpenModal(false)} />
        </li>
        <li>
          <Button
            text="Registration"
            onClick={() => onOpenModal(true)}
            className={css.btnRed}
          />
        </li>
      </ul>
    </>
  );
}
