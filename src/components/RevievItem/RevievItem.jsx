import { MdOutlineStarPurple500 } from 'react-icons/md';
import css from './RevievItem.module.css';

export default function ReviewItem({ review }) {
  console.log(review);
  const { reviewer, rating, comment } = review;

  const initial = reviewer.charAt(0); // Отримуємо першу літеру імені ревювера

  return (
    <>
      <div className={css.circleRewievWrapper}>
        <div className={css.circle}>
          <p className={css.initial}>{initial}</p>
        </div>
        <div className={css.revierRaitingWrapper}>
          <p>{reviewer}</p>
          <div className={css.raitingWrapper}>
            <MdOutlineStarPurple500 className={css.starIcon} size={16} />
            <p>{rating.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <p className={css.textComment}>{comment}</p>
    </>
  );
}
