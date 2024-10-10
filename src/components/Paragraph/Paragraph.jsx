import React from 'react';
import clsx from 'clsx';
import css from './Paragraph.module.css';

export default function Paragraph({ text, className }) {
  return <p className={clsx(css.paragraph, className)}>{text}</p>;
}
