import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { FiClock } from 'react-icons/fi';

import css from './TimeSelect.module.css';

const scheduleOptions = [
  { hour: '09', minute: '00' },
  { hour: '09', minute: '30' },
  { hour: '10', minute: '00' },
  { hour: '10', minute: '30' },
  { hour: '11', minute: '00' },
  { hour: '11', minute: '30' },
  { hour: '12', minute: '00' },
  { hour: '12', minute: '30' },
  { hour: '13', minute: '00' },
  { hour: '13', minute: '30' },
  { hour: '14', minute: '00' },
  { hour: '14', minute: '30' },
  { hour: '15', minute: '00' },
  { hour: '15', minute: '30' },
  { hour: '16', minute: '00' },
  { hour: '16', minute: '30' },
  { hour: '17', minute: '00' },
  { hour: '17', minute: '30' },
  { hour: '18', minute: '00' },
  { hour: '18', minute: '30' },
  { hour: '19', minute: '00' },
  { hour: '19', minute: '30' },
  { hour: '20', minute: '00' },
  { hour: '20', minute: '30' },
  { hour: '21', minute: '00' },
  { hour: '21', minute: '30' },
  { hour: '22', minute: '00' },
];

export default function TimeSelect({ selectedTime, onTimeChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const dropdownOptionsRef = useRef(null);
  const itemRefs = useRef([]);

  const visibleItems = 4;
  const itemHeight = 40;

  const handleTimeSelect = (hour, minute) => {
    onTimeChange(`${hour}:${minute}`);
    setDropdownOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = e => {
    if (!dropdownOpen) return;

    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prevIndex => {
        const newIndex =
          prevIndex < scheduleOptions.length - 1 ? prevIndex + 1 : 0;

        if (dropdownOptionsRef.current) {
          const element = itemRefs.current[newIndex];
          if (element) {
            element.scrollIntoView({ block: 'nearest' });
          }
        }

        return newIndex;
      });
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(prevIndex => {
        const newIndex =
          prevIndex > 0 ? prevIndex - 1 : scheduleOptions.length - 1;

        if (dropdownOptionsRef.current) {
          const element = itemRefs.current[newIndex];
          if (element) {
            element.scrollIntoView({ block: 'nearest' });
          }
        }

        return newIndex;
      });
    } else if (e.key === 'Enter' && highlightedIndex !== -1) {
      const { hour, minute } = scheduleOptions[highlightedIndex];
      handleTimeSelect(hour, minute);
    } else if (e.key === 'Escape') {
      setDropdownOpen(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen, highlightedIndex]);

  return (
    <div className={css.timeSelect} ref={dropdownRef}>
      <input
        type="text"
        value={selectedTime}
        readOnly
        placeholder="00:00"
        className={css.input}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      />
      {dropdownOpen && (
        <div
          className={css.dropdownOptions}
          ref={dropdownOptionsRef}
          style={{
            maxHeight: `${visibleItems * itemHeight}px`,
            overflowY: 'auto',
          }}
        >
          <span className={css.dropdownLabel}>Meeting time</span>
          {scheduleOptions.map(({ hour, minute }, index) => (
            <div
              key={`${hour}:${minute}`}
              className={clsx(css.optionItem, {
                [css.highlighted]: index === highlightedIndex,
              })}
              onClick={() => handleTimeSelect(hour, minute)}
              ref={el => (itemRefs.current[index] = el)}
              style={{ height: `${itemHeight}px` }}
            >
              <span className={css.hour}>{hour}</span> :{' '}
              <span className={css.minute}>{minute}</span>
            </div>
          ))}
        </div>
      )}
      <FiClock className={css.iconClock} />
    </div>
  );
}
