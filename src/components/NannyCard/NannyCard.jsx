import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { useState } from 'react';
import RewiewsList from '../RewiewsList/RewiewsList';
import NannyDetails from '../NannyDetails/NannyDetails.jsx';

import css from './NannyCard.module.css';

export default function NannyCard({ nanny }) {
  console.log(nanny);
  let rating = parseFloat(nanny.rating.toFixed(1));

  const calculateAge = birthday => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(nanny.birthday);

  const formatCharacters = characters => {
    return characters
      .map(character => character.charAt(0).toUpperCase() + character.slice(1))
      .join(', ');
  };

  const formattedCharacters = formatCharacters(nanny.characters);

  const [showMore, setShowMore] = useState(false);

  const openShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={css.cardContainer}>
      <div className={css.imageWrapper}>
        <img className={css.image} src={nanny.avatar_url} alt={nanny.name} />
      </div>

      <div>
        <div className={css.textInfoWrapper}>
          <div className={css.nameLocationPriceWrapper}>
            <div className={css.nannyNameWrapper}>
              <p className={css.textNanny}>Nanny</p>
              <p className={css.nameNanny}>{nanny.name}</p>
            </div>

            <div className={css.locationRatingPriceWrapper}>
              <HiOutlineLocationMarker className={css.locationIcon} size={16} />
              <p className={css.textLocation}>{nanny.location}</p>
              <hr className={css.verticalLine} />
              <MdOutlineStarPurple500 className={css.starIcon} size={16} />
              <p className={css.ratingInfo}>Rating: {rating}</p>
              <hr className={css.verticalLine} />
              <p>
                Price / 1 hour:{' '}
                <span className={css.priceAccent}>{nanny.price_per_hour}$</span>
              </p>
              <FaRegHeart className={css.heartIcon} size={26} />
            </div>
          </div>
          <NannyDetails
            age={age}
            experience={nanny.experience}
            kidsAge={nanny.kids_age}
            characters={formattedCharacters}
            education={nanny.education}
          />

          <p className={css.textAboutNanny}>{nanny.about}</p>
        </div>

        {!showMore && (
          <button className={css.readMoreBtn} onClick={openShowMore}>
            Read more
          </button>
        )}

        {showMore && (
          <>
            <RewiewsList reviews={nanny.reviews} />
            <button className={css.appointmentButton}>
              Make an appointment
            </button>
          </>
        )}
      </div>
    </div>
  );
}
