import { MdOutlineStarPurple500 } from "react-icons/md";


export default function ReviewItem({ review }) {
    console.log(review); 
    const { reviewer, rating, comment } = review; // Деструктуризація об'єкта review

    const initial = reviewer.charAt(0); // Отримуємо першу літеру імені ревювера

    return (
        <div>
           <p>{initial}</p>
               <p>{reviewer}</p>
            <MdOutlineStarPurple500 />
            <p>{rating}</p>
            <p>{comment}</p>
        </div>
    );
}
