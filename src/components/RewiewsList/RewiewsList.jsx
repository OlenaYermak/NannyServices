import ReviewItem from '../RevievItem/RevievItem';

import css from './RewiewsList.module.css';
export default function ReviewsList({ reviews }) {
  return (
    <ul className={css.revievList}>
      {reviews.map((review, index) => (
        <li key={index}>
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
}
