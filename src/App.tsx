import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

type Month = {
  name: string;
  days: Day[];
};

type Day = {
  ordinal: number;
  dayOfWeek: number;
  dayName: string;
};

function App() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth());
  const [monthData, setMonthData] = useState<Month | null>(null);

  const daySequence = useMemo(
    () => ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
    [],
  );

  const monthSequence = useMemo(
    () => [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ],
    [],
  );

  const changeMonth = (delta: number) => {
    let newMonth = monthIndex + delta;
    let newYear = year;

    if (newMonth < 0) {
      // If newMonth < 0, we're going beyond the first month of the year,
      // so reset to December's index, and decrement the year.
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      // If newMonth > 11, we're going beyond the last month of the year,
      // so reset to January's index, and increment the year.
      newMonth = 0;
      newYear++;
    }

    setYear(newYear);
    setMonthIndex(newMonth);
  };

  const buildMonth = useCallback((): void => {
    const days: Day[] = [];

    // monthIndex + 1 to get next month,
    // then day 0 grabs last day of previous month (current month).
    // This tells us how many days are in the current month.
    const daysInCurrentMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    const lastDayOfMonth = new Date(year, monthIndex, daysInCurrentMonth).getDay();

    // These three variables determine how many days from the previous and upcoming month to show at the beginning and end
    // of the current month's calendar.
    const previousMonthDays = firstDayOfMonth;
    const nextMonthDays = 7 - (lastDayOfMonth + 1);
    const totalDays = previousMonthDays + daysInCurrentMonth + nextMonthDays;

    let ordinal = 0;

    for (let i = 0; i < totalDays; i++) {
      if (firstDayOfMonth > i || ordinal === daysInCurrentMonth) {
        days.push({} as Day);
      } else {
        ordinal++;
        days.push({
          ordinal,
          dayOfWeek: i % 7,
          dayName: daySequence[i % 7],
        });
      }
    }

    setMonthData({ name: monthSequence[monthIndex], days });
  }, [year, monthIndex]);

  useEffect(() => {
    buildMonth();
  }, [buildMonth]);

  return (
    <>
      <div className="month-selector">
        <button onClick={() => changeMonth(-1)}>Previous</button>
        <h1 className="month-name">{monthData?.name}</h1>
        <button onClick={() => changeMonth(1)}>Heyo I'm here now</button>
      </div>
      <div className="day-names">
        {daySequence.map((dayOfWeek, i) => (
          <div key={i}>{dayOfWeek}</div>
        ))}
      </div>
      <div className="days">
        {monthData?.days.map((day, i) => (
          <div key={i} className="cell">
            {day.ordinal}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
