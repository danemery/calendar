import { useEffect, useMemo, useState } from 'react';
import './App.css';

type Day = {
  ordinal: number;
  dayOfWeek: number;
  dayName: string;
};

function App() {
  const [dayList, setDayList] = useState(Array<Day>);

  const daySequence = useMemo(
    () => ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
    [],
  );

  const buildDateList = (): void => {
    const days: Day[] = [];

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // day 0 grabs last day of previous month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Push empty days to represent the previous month's days that should be shown in the current month
    // if the current month doesn't start on a Sunday.
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({} as Day);
    }

    for (let i = 0; i < daysInMonth; i++) {
      days.push({
        ordinal: i + 1,
        dayOfWeek: (firstDayOfMonth + i) % 7,
        dayName: daySequence[(firstDayOfMonth + i) % 7],
      });
    }

    setDayList(days);
  };

  useEffect(() => {
    buildDateList();
  }, []);

  return (
    <>
      <div className="day-names">
        {daySequence.map((dayOfWeek) => (
          <div>{dayOfWeek}</div>
        ))}
      </div>
      <div className="days">
        {dayList.map((day: Day) => (
          <div className="cell">{day.ordinal}</div>
        ))}
      </div>
    </>
  );
}

export default App;
