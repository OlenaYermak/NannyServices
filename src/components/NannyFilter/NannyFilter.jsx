import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { setFilterOption } from '../../redux/nanny/nannySlice.js';
import { selectFilterOption } from '../../redux/nanny/nannySelectors.js';
import css from './NannyFilter.module.css';

export default function NannyFilter() {
  const dispatch = useDispatch();
  const filterOption = useSelector(selectFilterOption);

  const handleFilterChange = selectedOption => {
    dispatch(setFilterOption(selectedOption.value));
  };

  const options = [
    { value: 'AtoZ', label: 'A to Z' },
    { value: 'ZtoA', label: 'Z to A' },
    { value: 'lessThan10', label: 'Less than 10$' },
    { value: 'greaterThan10', label: 'Greater than 10$' },
    { value: 'popular', label: 'Popular' },
    { value: 'notPopular', label: 'Not popular' },
    { value: 'showAll', label: 'Show all' },
  ];

  const customStyles = {
    control: provided => ({
      ...provided,
      backgroundColor: '#f03f3b',
      fontFamily: 'HelveticaNeueCyr, sans-serif',
      fontSize: '18px',
      color: '#fbfbfb',
      width: '226px',
      height: '48px',
      border: 'none',
      borderRadius: '14px',
      paddingLeft: '10px',
      paddingRight: '10px',
      textAlign: 'left',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'transparent',
      },
      cursor: 'pointer',
    }),
    singleValue: provided => ({
      ...provided,
      color: '#fbfbfb',
      marginLeft: '0',
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: '#ffffff',
      width: '226px',
      borderRadius: '14px',
      boxShadow: '0px 20px 69px 0px #00000012',
      marginTop: '8px',
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: 'left',
      backgroundColor: 'transparent',
      color: state.isFocused ? '#11101c' : '#11101C4D',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: '#fbfbfb',
      '&:hover': {
        color: '#fbfbfb',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <section className={css.section}>
      <div className={css.fiterContainer}>
        <label className={css.label} htmlFor="filter">
          Filters
        </label>
        <Select
          id="filter"
          options={options}
          onChange={handleFilterChange}
          styles={customStyles}
          value={options.find(option => option.value === filterOption)}
        />
      </div>
    </section>
  );
}
