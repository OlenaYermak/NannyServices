import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase.js';
import NannyList from '../../components/NannyList/NannyList.jsx';
import NannyFilter from '../../components/NannyFilter/NannyFilter.jsx';
import Button from '../../components/Button/Button.jsx';
import css from './NanniesPage.module.css';

export default function NanniesPage() {
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true); // Завантаження
  const [error, setError] = useState(null); // Обробки помилок
  const [visibleCount, setVisibleCount] = useState(3); // Початкова кількість видимих нянь
  const [filterOption, setFilterOption] = useState('AtoZ'); // Поле для фільтра

  useEffect(() => {
    const fetchNannies = async () => {
      setLoading(true); // Показуємо завантаження
      try {
        const nanniesRef = ref(database, '/');
        const snapshot = await get(nanniesRef);

        if (snapshot.exists()) {
          const nanniesData = snapshot.val();
          setNannies(Object.values(nanniesData));
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching nannies: ', error);
        setError(error); // Зберігаємо помилку
      } finally {
        setLoading(false); // Приховуємо завантаження
      }
    };

    fetchNannies();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Показуємо текст під час завантаження
  }

  if (error) {
    return <p>Error fetching nannies: {error.message}</p>; // Показуємо помилку, якщо вона є
  }

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

    // Перевірка наявності результатів фільтрації
    if (filteredNannies.length === 0) {
      return 'No nannies found for the selected filter.'; // Повернення повідомлення, якщо нянь не знайдено
    }

    return filteredNannies;
  };

  const filteredNannies = filterNannies(nannies);
  const allNanniesLoaded = visibleCount >= filteredNannies.length; // Перевірка, чи всі няні вже завантажені

  return (
    <div className={css.nanniesPage}>
      <h1>Список Нянь</h1>

      <NannyFilter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      {typeof filteredNannies === 'string' ? (
        <p>{filteredNannies}</p>
      ) : (
        <>
          <NannyList nannies={filteredNannies.slice(0, visibleCount)} />
          {!allNanniesLoaded && (
            <Button
              text="Load more"
              onClick={() => setVisibleCount(prevCount => prevCount + 3)}
            />
          )}
        </>
      )}
    </div>
  );
}
