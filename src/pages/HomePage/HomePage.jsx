import HeroSection from '../../components/HeroSection/HeroSection.jsx';

import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.pageContainer}>
      <HeroSection />
    </div>
  );
}
