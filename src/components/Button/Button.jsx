import clsx from 'clsx';
import css from './Button.module.css';

export default function Button({ text, className, onClick, type = 'button' }) {
  return (
    <button className={clsx(css.btn, className)} onClick={onClick} type={type}>
      {text}
    </button>
  );
}
