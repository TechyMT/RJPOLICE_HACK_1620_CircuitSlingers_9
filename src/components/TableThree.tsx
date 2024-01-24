// "use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import TablePlaceholder from './TablePlaceholder';
import { publicUrl } from '../utils/publicUrl';
import DropdownSearch from './DropdownTable';
// import User1 from '../images/user/user-01.png';
import PackageItem from './PackageItem';

const TableThree: React.FC<any> = ({ packages, loading }) => {
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null,
  );
  const [selectedOption, setSelectedOption] = useState('All Reports'); // To store the selected option
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle dropdown visibility

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log('all', packages[selectedOption]);
  const totalEntries = packages[selectedOption].length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedPackages = packages[selectedOption].slice(
    startIndex,
    endIndex,
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleOptionChange = (option: string) => {
    // Handle the option change
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full hidden md:block overflow-x-hidden mb-6">
        <div className="relative flex justify-between text-left my-12">
          <button
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-graydark dark:focus:ring-gray-700"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedOption || 'All'}{' '}
            {/* Display selected option or default text */}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 3zm0 11a1 1 0 01-1-1V4a1 1 0 012 0v9a1 1 0 01-1 1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className={`absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-graydark dark:divide-gray mt-1 ${
              isDropdownOpen ? 'block' : 'hidden'
            }`}
            style={{ top: '100%', left: 0 }}
          >
            {/* Your existing dropdown content */}

            {/* Add more options as needed */}
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioButton"
            >
              <li>
                <div className="flex items-center p-2 rounded hover:bg-body dark:hover:bg-body">
                  <input
                    id="filter-radio-example-1"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleOptionChange('Last Day Reports')}
                  />
                  <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                    Last day
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-2"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleOptionChange('Last 7 Days Reports')}
                  />
                  <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-3">
                    Last 7 days
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-3"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleOptionChange('Last 30 Days Reports')}
                  />
                  <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                    Last 30 days
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-4"
                    type="radio"
                    value="1"
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleOptionChange('All Reports')}
                    checked={selectedOption === 'All Reports' && true}
                  />

                  <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                    {`All`}
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
        {/* Table Element */}
        <table className="flex flex-col w-full table-auto mb-12">
          <thead className="w-full flex">
            <tr className="flex w-full bg-gray-2 text-left dark:bg-meta-4">
              <th className="flex w-1/6 justify-center font-medium text-black dark:text-white">
                Tracking ID
              </th>
              <th className="flex w-1/6 justify-center font-medium text-black dark:text-white">
                City
              </th>
              <th className="flex w-1/6 justify-center font-medium text-black dark:text-white">
                Report Date
              </th>
              <th className="flex w-1/6 justify-center font-medium text-black dark:text-white">
                Status
              </th>
              <th className="flex w-1/6 justify-center font-medium text-black dark:text-white">
                Actions
              </th>
              <th className="flex w-1/6 justify-center font-medium text-black dark:text-white">
                Assign(ed) To
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr className="border-b border-[#eee] dark:border-strokedark">
                <td colSpan={5}>
                  <TablePlaceholder />
                </td>
              </tr>
              <tr className="border-b border-[#eee] dark:border-strokedark">
                <td colSpan={5}>
                  <TablePlaceholder />
                </td>
              </tr>
              <tr className="border-b border-[#eee] dark:border-strokedark">
                <td colSpan={5}>
                  <TablePlaceholder />
                </td>
              </tr>
              <tr className="border-b border-[#eee] dark:border-strokedark">
                <td colSpan={5}>
                  <TablePlaceholder />
                </td>
              </tr>
              <tr className="border-b border-[#eee] dark:border-strokedark">
                <td colSpan={5}>
                  <TablePlaceholder />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {displayedPackages.map((pkg, index) => {
                const isAccordionOpen = index === openAccordionIndex;

                return (
                  <PackageItem
                    key={index}
                    {...pkg}
                    isStripped={index % 2 === 0}
                    isAccordionOpen={isAccordionOpen}
                    onAccordionToggle={() => handleAccordionToggle(index)}
                  />
                );
              })}
            </tbody>
          )}
        </table>
        {/* Pagination Element */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {startIndex + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(endIndex, totalEntries)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalEntries}
            </span>{' '}
            Entries
          </span>
          {/* Pagination Element */}
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="flex items-center justify-center px-3 h-8 text-sm font-medium dark:text-white text-black bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              className="flex items-center justify-center px-3 h-8 text-sm font-medium dark:text-white text-black bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='flex p-12 md:hidden'>
        Please view this on a larger screen for optimised experience
      </div>
    </div>
  );
};

export default TableThree;
