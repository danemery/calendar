import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
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
  const [month, setMonth] = useState<Month | null>(null);

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

  useEffect(() => {
    buildMonth(setMonth, monthSequence, daySequence);
  }, []);

  return (
    <>
      <h1 className="month-name">{month?.name}</h1>
      <div className="day-names">
        {daySequence.map((dayOfWeek, i) => (
          <div key={i}>{dayOfWeek}</div>
        ))}
      </div>
      <div className="days">
        {month?.days.map((day, i) => (
          <div key={i} className="cell">
            {day.ordinal}
          </div>
        ))}
      </div>
    </>
  );
}

const buildMonth = (
  setMonth: Dispatch<SetStateAction<Month | null>>,
  monthSequence: string[],
  daySequence: string[],
): void => {
  const days: Day[] = [];

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // day 0 grabs last day of previous month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();

  // These three variables determine how many days from the previous and upcoming month to show at the beginning and end
  // of the current month's calendar.
  const previousMonthDays = firstDayOfMonth;
  const nextMonthDays = 7 - (lastDayOfMonth + 1);
  const totalBlocks = previousMonthDays + daysInMonth + nextMonthDays;

  let ordinal = 0;

  for (let i = 0; i < totalBlocks; i++) {
    if (firstDayOfMonth > i || ordinal === daysInMonth) {
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

  setMonth({ name: monthSequence[month], days });
};

export default App;
