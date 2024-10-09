import NannyCard from '../NannyCard/NannyCard.jsx';
import css from './NannyList.module.css';

export default function NannyList({ nannies, visibleCount }) {
  return (
    <>
      <ul className={css.nanniesList}>
        {nannies.slice(0, visibleCount).map((nanny, index) => (
          <li key={index}>
            <NannyCard nanny={nanny} />
          </li>
        ))}
      </ul>
    </>
  );
}
