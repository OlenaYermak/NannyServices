import nannies from '../../nannies.json';
import NannyCard from '../NannyCard/NannyCard';

import css from './NannyList.module.css';

export default function NannyList() {
  return (
    <ul className={css.nanniesList}>
      {nannies.map((nanny, index) => {
        return (
          <li key={index}>
            <NannyCard nanny={nanny} />
          </li>
        );
      })}
    </ul>
  );
}
