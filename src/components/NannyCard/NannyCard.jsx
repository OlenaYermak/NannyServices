import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { useState } from "react";
import RewiewsList from "../RewiewsList/RewiewsList";

import css from "./NannyCard.module.css"

export default function NannyCard({ nanny }) {
    console.log(nanny);
    let rating = parseFloat(nanny.rating.toFixed(1));
    
  
    const calculateAge = (birthday) => {
      const birthDate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    };

    
    const age = calculateAge(nanny.birthday);

    const formatCharacters = (characters) => {
        return characters
          .map((character) => character.charAt(0).toUpperCase() + character.slice(1)) 
          .join(", "); 
    };

    const formattedCharacters = formatCharacters(nanny.characters); 
    
    
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
      setShowMore(!showMore);
    };

    return (
        <>
            <div className={css.imageWrapper}>
                <img className={css.image} src={nanny.avatar_url} alt={nanny.name} />
            </div>
            
        <div>
            <p>Nanny</p>
            <HiOutlineLocationMarker />
            <p>{nanny.location}</p>
            <MdOutlineStarPurple500 />
            <p>{rating}</p>
            <p>Price / 1 hour: {nanny.price_per_hour}$</p>
            <FaRegHeart />
            <p>{nanny.name}</p>
            <ul>
                <li>Age: {age}</li>
                <li>Experience: {nanny.experience}</li>
                <li>Kids Age: {nanny.kids_age}</li>
                <li>Characters: {formattedCharacters}</li>
                <li>Education: {nanny.education}</li>
            </ul>
            
            <p>{nanny.about}</p>
            
           
            <button onClick={toggleShowMore}>
              {showMore ? "Hide details" : "Read more"}
            </button>

            
            {showMore && (
              <div>
                <ul>
                  {nanny.reviews.map((review, index) => (
                    <li key={index}>
                      <p><strong>{review.reviewer}</strong> ({review.rating} stars)</p>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                        </ul>
            <RewiewsList reviews={nanny.reviews} />
                        <button>Make an appointment</button>
                        
                        
              </div>
            )}
        </div>
      </>
    );
}




