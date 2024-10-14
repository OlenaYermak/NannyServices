import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNannies } from '../../redux/nanny/nannyOperations.js';
import { loadMoreNannies } from '../../redux/nanny/nannySlice.js';
import {
  selectFilterOption,
  selectNannies,
  selectLoading,
  selectError,
  selectVisibleCount,
} from '../../redux/nanny/nannySelectors.js';

import { setFilterOption } from '../../redux/nanny/nannySlice.js';

import NannyList from '../../components/NannyList/NannyList.jsx';
import NannyFilter from '../../components/NannyFilter/NannyFilter.jsx';
import Button from '../../components/Button/Button.jsx';
import css from './NanniesPage.module.css';

export default function NanniesPage() {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filterOption = useSelector(selectFilterOption);
  const visibleCount = useSelector(selectVisibleCount);

  useEffect(() => {
    dispatch(fetchNannies());
  }, [dispatch]);

  const filterNannies = nannies => {
    let filteredNannies = [...nannies];

    switch (filterOption) {
      case 'AtoZ':
        filteredNannies.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ZtoA':
        filteredNannies.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'lessThan10':
        filteredNannies = filteredNannies
          .filter(nanny => Number(nanny.price_per_hour) < 10)
          .sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case 'greaterThan10':
        filteredNannies = filteredNannies
          .filter(nanny => Number(nanny.price_per_hour) >= 10)
          .sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case 'popular':
        filteredNannies.sort((a, b) => b.rating - a.rating);
        break;
      case 'notPopular':
        filteredNannies.sort((a, b) => a.rating - b.rating);
        break;
      case 'showAll':
      default:
        break;
    }

    if (filteredNannies.length === 0) {
      return 'No nannies found for the selected filter.';
    }

    return filteredNannies;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching nannies: {error}</p>;
  }

  const filteredNannies = filterNannies(nannies);
  const allNanniesLoaded = visibleCount >= filteredNannies.length;

  return (
    <div className={css.nanniesPage}>
      <NannyFilter
        filterOption={filterOption}
        setFilterOption={option => dispatch(setFilterOption(option.value))}
      />

      {typeof filteredNannies === 'string' ? (
        <p>{filteredNannies}</p>
      ) : (
        <>
          <NannyList nannies={filteredNannies.slice(0, visibleCount)} />
          {!allNanniesLoaded && (
            <Button
              text="Load more"
              onClick={() => dispatch(loadMoreNannies())}
              className={css.btnRed}
            />
          )}
        </>
      )}
    </div>
  );
}
