import { Link } from 'react-router-dom';

import { MdOutlineArrowOutward } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

import css from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={css.heroSection}>
      {' '}
      <div className={css.heroSectionTextWrapper}>
        <h1 className={css.heroSectionTitle}>
          Make Life Easier for the Family:
        </h1>
        <p className={css.heroSectionText}>
          Find Babysitters Online for All Occasions
        </p>
        <Link to="/nannies" className={css.heroSectionLink}>
          Get started <MdOutlineArrowOutward className={css.icon} size={18} />
        </Link>
      </div>
      <div className={css.heroSectionPicture}>
        <div className={css.infoBox}>
          <div className={css.checkIconWrapper}>
            <FaCheck size={20} className={css.checkIcon} />
          </div>
          <div className={css.textWrapper}>
            <p className={css.mainText}>Experienced nannies</p>
            <p className={css.subText}>15,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
