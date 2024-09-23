import css from './NannyDetails.module.css';

export default function NannyDetails({
  age,
  experience,
  kidsAge,
  characters,
  education,
}) {
  return (
    <ul className={css.nannyDetailsList}>
      <li className={css.nannyDetailsListItem}>
        <span className={css.label}>Age: </span>
        <span className={css.valueAge}>{age}</span>
      </li>
      <li className={css.nannyDetailsListItem}>
        <span className={css.label}>Experience: </span>
        {experience}
      </li>
      <li className={css.nannyDetailsListItem}>
        <span className={css.label}>Kids Age: </span>
        {kidsAge}
      </li>
      <li className={css.nannyDetailsListItem}>
        <span className={css.label}>Characters: </span>
        {characters}
      </li>
      <li className={css.nannyDetailsListItem}>
        <span className={css.label}>Education: </span>
        {education}
      </li>
    </ul>
  );
}
