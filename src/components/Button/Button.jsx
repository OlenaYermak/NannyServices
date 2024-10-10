import clsx from 'clsx';
import styles from './Button.module.css';

export default function Button({ text, className, onClick, type = 'button' }) {
  return (
    <button
      className={clsx(styles.btn, className)}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
