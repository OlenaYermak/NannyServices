import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RewiewsList from '../RewiewsList/RewiewsList';
import NannyDetails from '../NannyDetails/NannyDetails.jsx';
import Paragraph from '../Paragraph/Paragraph.jsx';
import Button from '../Button/Button.jsx';
import AppointmentModal from '../AppointmentModal/AppointmentModal.jsx';
import { selectCurrentUser } from '../../redux/auth/selectors.js';
import {
  addFavorite,
  removeFavorite,
  loadFavorites,
  clearFavorites,
} from '../../redux/favorite/favoriteSlice.js';

import css from './NannyCard.module.css';

export default function NannyCard({ nanny }) {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const favorites = useSelector(state => state.favorites);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(clearFavorites());
    }
  }, [user, dispatch]);

  function generateUniqueId(name, birthday) {
    return btoa(`${name}-${birthday}`);
  }

  const nannyId = generateUniqueId(nanny.name, nanny.birthday);
  const isFavorite = favorites.includes(nannyId);

  const toggleFavorite = () => {
    if (!user) {
      alert('This feature is available for authorized users only!');
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(nannyId));
    } else {
      dispatch(addFavorite(nannyId));
    }
  };

  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem(user.uid)) || [];
      if (storedFavorites.length > 0) {
        dispatch(loadFavorites(storedFavorites));
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(user.uid, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const openShowMore = () => {
    setShowMore(!showMore);
  };

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

  const handleMakeAppointment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

              <button className={css.heartIcon} onClick={toggleFavorite}>
                {isFavorite ? (
                  <FaHeart size={26} style={{ color: '#f03f3b' }} />
                ) : (
                  <FaRegHeart size={26} style={{ color: '#11101C' }} />
                )}
              </button>
            </div>
          </div>

          <NannyDetails
            age={age}
            experience={nanny.experience}
            kidsAge={nanny.kids_age}
            characters={formattedCharacters}
            education={nanny.education}
          />

          <Paragraph text={nanny.about} />
        </div>

        {!showMore && (
          <button className={css.readMoreBtn} onClick={openShowMore}>
            Read more
          </button>
        )}

        {showMore && (
          <>
            <RewiewsList reviews={nanny.reviews} />
            <Button
              text="Make an appointment"
              onClick={handleMakeAppointment}
              className={css.btnRed}
            />
          </>
        )}
      </div>

      {isModalOpen && (
        <AppointmentModal
          nanny={nanny}
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
        />
      )}
    </div>
  );
}
