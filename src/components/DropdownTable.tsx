import React, { useState, useRef, useEffect } from 'react';

const DropdownSearch: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('Last 30 days');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    closeDropdown();
    // Add your logic here for handling the selected option change
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex justify-between" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
      >
        <svg
          className={`w-3 h-3 text-gray-500 dark:text-gray-400 me-3 transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
        </svg>
        {selectedOption}
      </button>
      {isDropdownOpen && (
        <div
          className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-1"
          style={{ top: '100%', left: 0 }}
        >
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id="filter-radio-example-1"
                  type="radio"
                  value=""
                  name="filter-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedOption === 'Last day'}
                  onChange={() => handleOptionChange('Last day')}
                />
                <label
                  htmlFor="filter-radio-example-1"
                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  Last day
                </label>
              </div>
            </li>
            {/* Repeat similar structure for other options */}
          </ul>
        </div>
      )}
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        {/* Your search input code */}
        <input
          type="text"
          id="table-search"
          className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>
    </div>
  );
};

export default DropdownSearch;
