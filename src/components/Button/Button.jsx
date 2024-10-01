import clsx from 'clsx';
import styles from './Button.module.css';

export default function Button({ text, className, onClick }) {
  return (
    <button className={clsx(styles.btn, className)} onClick={onClick}>
      {text}
    </button>
  );
}
