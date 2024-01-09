import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const Calendar = () => {
  // State to manage the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  const generateMonths = () => {
    const months = [];

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (let i = 0; i < 12; i++) {
      months.push(
        <div key={i} className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-center text-lg font-semibold py-3 bg-primary text-white rounded-t-sm">
            {monthNames[i]}
          </h2>
          <div className="grid grid-cols-7">
            {generateDays(i + 1)} {/* Passing the month index for the schedule */}
          </div>
        </div>
      );
    }

    return months;
  };

  const generateDays = (monthIndex) => {
    const days = [];

    // For simplicity, generating placeholders for 30 days
    for (let i = 1; i <= 30; i++) {
      const date = new Date(2024, monthIndex - 1, i); // Creating a Date object for the current day

      days.push(
        <div
          key={i}
          className={`ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${
            selectedDate && date.toDateString() === selectedDate.toDateString() ? 'bg-primary text-white' : ''
          }`}
          onClick={() => handleDateSelection(date)}
        >
          <span className="font-medium text-black dark:text-white">{i}</span>
          {selectedDate && date.toDateString() === selectedDate.toDateString() && (
            <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 md:visible md:w-[190%] md:opacity-100">
              <span className="event-name text-sm font-semibold text-black dark:text-white">
                Update Files
              </span>
              <span className="time text-sm font-medium text-black dark:text-white">
                {selectedDate.toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Breadcrumb pageName="Calendar" />
      <div className="flex flex-wrap justify-center">
        {generateMonths()}
      </div>
    </>
  );
};

export default Calendar;
