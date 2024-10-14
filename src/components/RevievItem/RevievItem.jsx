import { MdOutlineStarPurple500 } from 'react-icons/md';

import Paragraph from '../Paragraph/Paragraph.jsx';

import css from './RevievItem.module.css';

export default function ReviewItem({ review }) {
  const { reviewer, rating, comment } = review;

  const initial = reviewer.charAt(0);

  return (
    <>
      <div className={css.circleRewievWrapper}>
        <div className={css.circle}>
          <p className={css.initial}>{initial}</p>
        </div>
        <div className={css.revierRaitingWrapper}>
          <p className={css.revierName}>{reviewer}</p>
          <div className={css.raitingWrapper}>
            <MdOutlineStarPurple500 className={css.starIcon} size={16} />
            <p className={css.raitingText}>{rating.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <Paragraph text={comment} />
    </>
  );
}
