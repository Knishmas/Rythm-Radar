
import './Styles/Button.css';

const TimeRangeButtons = ({ activeRange, setActiveRange }) => {
  return (
    <ul className='time-range-buttons'>
      <li>
        <button
          className={activeRange === 'short' ? 'active' : ''}
          onClick={() => setActiveRange('short')}>
          This Month
        </button>
      </li>
      <li>
        <button
          className={activeRange === 'medium' ? 'active' : ''}
          onClick={() => setActiveRange('medium')}>
          Last 6 Months
        </button>
      </li>
      <li>
        <button
          className={activeRange === 'long' ? 'active' : ''}
          onClick={() => setActiveRange('long')}>
          All Time
        </button>
      </li>
    </ul>
  );
};

export default TimeRangeButtons;