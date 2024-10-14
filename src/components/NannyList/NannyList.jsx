import NannyCard from '../NannyCard/NannyCard.jsx';
import css from './NannyList.module.css';

function generateUniqueId(name, birthday) {
  return btoa(`${name}-${birthday}`);
}

export default function NannyList({ nannies }) {
  return (
    <ul className={css.nanniesList}>
      {nannies.map(nanny => (
        <li key={generateUniqueId(nanny.name, nanny.birthday)}>
          {' '}
          <NannyCard nanny={nanny} />
        </li>
      ))}
    </ul>
  );
}
