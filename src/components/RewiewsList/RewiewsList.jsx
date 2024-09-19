import ReviewItem from "../RevievItem/RevievItem";
export default function ReviewsList({ reviews }) {


  return (
    <ul>
      {reviews.map((review, index) => (
        <li  key={index}>
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
};