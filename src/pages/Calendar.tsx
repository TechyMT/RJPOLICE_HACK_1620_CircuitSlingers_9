import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(1); // Initially month set to January
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [scheduledTasks, setScheduledTasks] = useState({});

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateMonthsDropdown = () => {
    const options = monthNames.map((month, index) => (
      <option key={index + 1} value={index + 1}>
        {month}
      </option>
    ));

    return (
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        className="my-4 p-2 border border-stroke rounded"
      >
        {options}
      </select>
    );
  };

  const generateDays = () => {
    const days = [];
    const totalDays = new Date(2024, selectedMonth, 0).getDate();

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(2024, selectedMonth - 1, i);
      const dateString = date.toDateString();

      days.push(
        <div
          key={i}
          className={`ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}
          onClick={() => handleDateSelection(date)}
        >
          <span className="font-medium text-black dark:text-white">{i}</span>
          {scheduledTasks[dateString] && (
            <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 md:visible md:w-[190%] md:opacity-100">
              <span className="event-name text-sm font-semibold text-black dark:text-white">
                {scheduledTasks[dateString]}
              </span>
              <span className="time text-sm font-medium text-black dark:text-white">
                {dateString}
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

  const handleTaskSubmission = () => {
    if (selectedDate && taskName) {
      const dateString = selectedDate.toDateString();
      setScheduledTasks({ ...scheduledTasks, [dateString]: taskName });
      setTaskName('');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Calendar" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {generateMonthsDropdown()}
        <div className="grid grid-cols-7">
          {generateDays()}
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-stroke p-2 rounded"
          />
          <button
            onClick={handleTaskSubmission}
            className="ml-2 px-4 py-2 bg-primary text-white rounded"
          >
            Schedule Task
          </button>
        </div>
      </div>
    </>
  );
};

export default Calendar;
