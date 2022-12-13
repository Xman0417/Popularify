import { StyledRangeButtons } from '../styles';

//Component that has buttons to set the range of the top tracks/artist
const TimeRangeButtons = ({ activeRange, setActiveRange }) => {
    return (
        <StyledRangeButtons>
            <li>
                <button
                    className={activeRange === 'short' ? 'active' : ''}
                    onClick={() => setActiveRange('short')}
                >
                    This Month
                </button>
            </li>
            <li>
                <button
                    className={activeRange === 'medium' ? 'active' : ''}
                    onClick={() => setActiveRange('medium')}
                >
                    Last 6 Months
                </button>
            </li>
            <li>
                <button
                    className={activeRange === 'long' ? 'active' : ''}
                    onClick={() => setActiveRange('long')}
                >
                    All Time
                </button>
            </li>
        </StyledRangeButtons>
    );
};

export default TimeRangeButtons;