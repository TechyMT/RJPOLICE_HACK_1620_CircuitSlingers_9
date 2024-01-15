// "use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import TablePlaceholder from './TablePlaceholder';
import { publicUrl } from '../utils/publicUrl';
import DropdownSearch from './DropdownTable';
import { policeData } from '../data/constants';
import User1 from '../images/user/user-01.png';
const PackageItem: React.FC<any> = ({
  trackId,
  reportDate,
  currentStatus,
  city,
  isStripped = false,
  reportURL,
  isAccordionOpen,
  onAccordionToggle,
}) => {
  const toggleAccordion = () => {
    onAccordionToggle();
  };
  const [formData, setFormData] = useState<any>({
    comments: '',
    status: '',
  });

  const [isEdit, setIsEdit] = useState<boolean>(true);

  const getcurrentStatusClass = () => {
    if (currentStatus === 'Case Completed') {
      return 'bg-success bg-opacity-10 text-success';
    } else if (currentStatus === 'Case Register , E-FIR filed') {
      return 'bg-danger bg-opacity-10 text-danger';
    }
    return '';
  };

  const [selectedOption, setSelectedOption] = useState(''); // To store the selected option
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle dropdown visibility
  const handleOptionChange = (option: string) => {
    // Handle the option change\

    setSelectedOption(option);
    setIsDropdownOpen(false);
    toggleAccordion(); // Close the dropdown after selection
  };

  const handleClick = () => {
    console.log('clicked');
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <tr
        className={`flex w-full items-center border-b border-[#eee] dark:border-strokedark ${
          isStripped ? 'bg-gray' : ''
        } ${isAccordionOpen ? 'border-meta-3' : ''} transition-bg`}
        // Toggle accordion on row click
        style={{ cursor: 'pointer' }}
      >
        <div className="flex items-center" onClick={toggleAccordion}>
          <td className="dark:text-white min-w-[183px] justify-center flex">
            <h5 className="font-medium text-black dark:text-white">
              {trackId}
            </h5>
          </td>
          <td className="dark:text-white min-w-[183px] justify-center flex">
            {city}
          </td>
          <td className="dark:text-white min-w-[183px] justify-center flex">
            {reportDate}
          </td>
          <td
            className={`py-2 px-4 dark:text-white min-w-[183px] ${getcurrentStatusClass()} inline-flex rounded-full px-5 text-sm font-medium my-7 justify-center`}
          >
            {currentStatus}
          </td>
        </div>
        <td className="dark:border-strokedark min-w-[183px] justify-center flex">
          <div className="flex justify-center items-center mx-auto min-w-[183px]">
            {/* Buttons here */}

            <div className="flex items-center justify-center">
              <a
                href={reportURL}
                className="hover:text-primary"
                title="Download Report"
              >
                <button className="hover:text-primary" title="Download Report">
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                      fill=""
                    />
                    <path
                      d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                      fill=""
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </td>
        <td className="dark:text-white min-w-[183px] justify-center flex p-4">
          <button
            id="dropdownHoverButton"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            onClick={() => handleClick()}
          >
            {selectedOption && (
              <img
                className="w-9 h-9 p-1 rounded-full "
                src={User1}
                alt="Bordered avatar"
              />
            )}
            {selectedOption || 'Select Option'}{' '}
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

          {/* Dropdown menu */}
          <div
            id="dropdownHover"
            className={`absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-12 ${
              isDropdownOpen ? 'block' : 'hidden'
            }`}
            // style={{ top: '90%', right: '0' }}
          >
            {/* Your modified list items */}
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200 overflow-y-auto h-[30vh]"
              aria-labelledby="dropdownHoverButton"
            >
              {/* <li>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left focus:outline-none"
                  onClick={() => handleOptionChange('Dashboard')}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left focus:outline-none"
                  onClick={() => handleOptionChange('Settings')}
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left focus:outline-none"
                  onClick={() => handleOptionChange('Earnings')}
                >
                  Earnings
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left focus:outline-none"
                  onClick={() => handleOptionChange('Sign out')}
                >
                  Sign out
                </button>
              </li> */}
              {policeData.map((data, index) => {
                return (
                  <li key={index}>
                    {data.isAssigned ? (
                      <button
                        className=" block px-4 hover:cursor-not-allowed py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left focus:outline-none bg-gray-2 my-2"
                        onClick={() => handleOptionChange(data.name)}
                        disabled={data.isAssigned}
                      >
                        <div className="flex gap-2 items-center">
                          <img
                            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                            src={User1}
                            alt="Bordered avatar"
                          />
                          <div>{data.name}</div>
                        </div>
                      </button>
                    ) : (
                      <button
                        className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left focus:outline-none"
                        onClick={() => handleOptionChange(data.name)}
                        disabled={data.isAssigned}
                      >
                        <div className="flex gap-2 items-center">
                          <img
                            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                            src={User1}
                            alt="Bordered avatar"
                          />
                          <div>{data.name}</div>
                        </div>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </td>
      </tr>
      {isAccordionOpen && (
        <tr
          className={`transition-all flex w-full ${
            isAccordionOpen
              ? 'max-h-[500px] opacity-100 border-b-2 border-b-meta-3 rounded'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <td colSpan={6} className="p-4 w-full">
            {/* Your additional content goes here */}
            <div className="flex w-full">
              <form className="w-full flex flex-col">
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="w-full flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                    <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                        <div className="text-black dark:text-white">
                          Comments
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      data-tooltip-target="tooltip-fullscreen"
                      className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 19 19"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                        />
                      </svg>
                      <span className="sr-only">Full screen</span>
                    </button>
                    <div
                      id="tooltip-fullscreen"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                      Show full screen
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <textarea
                      id="editor"
                      rows={8}
                      className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus-within:border-0 focus-visible:border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      placeholder="Please Enter your comments for this case here..."
                      required
                      value={''}
                      disabled={isEdit}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      Update Case Status: 
                    </div>
                    <div>
                      <button
                        id="dropdownHoverButton"
                        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() => handleClick()}
                      >
                        {selectedOption && (
                          <img
                            className="w-9 h-9 p-1 rounded-full "
                            src={User1}
                            alt="Bordered avatar"
                          />
                        )}
                        {selectedOption || 'Select Option'}{' '}
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
                    </div>
                    {/* Dropdown menu */}
                    <div
                      id="dropdownHover"
                      className={`absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-12 ${
                        isDropdownOpen ? 'block' : 'hidden'
                      }`}
                      // style={{ top: '90%', right: '0' }}
                    >
                      {/* Your modified list items */}
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200 overflow-y-auto h-[30vh]"
                        aria-labelledby="dropdownHoverButton"
                      >
                        {policeData.map((data, index) => {
                          return (
                            <li key={index}>
                              {data.isAssigned ? (
                                <button
                                  className=" block px-4 hover:cursor-not-allowed py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left focus:outline-none bg-gray-2 my-2"
                                  onClick={() => handleOptionChange(data.name)}
                                  disabled={data.isAssigned}
                                >
                                  <div className="flex gap-2 items-center">
                                    <img
                                      className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                                      src={User1}
                                      alt="Bordered avatar"
                                    />
                                    <div>{data.name}</div>
                                  </div>
                                </button>
                              ) : (
                                <button
                                  className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left focus:outline-none"
                                  onClick={() => handleOptionChange(data.name)}
                                  disabled={data.isAssigned}
                                >
                                  <div className="flex gap-2 items-center">
                                    <img
                                      className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                                      src={User1}
                                      alt="Bordered avatar"
                                    />
                                    <div>{data.name}</div>
                                  </div>
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <button className="bg-primary text-white">edit</button>
                    </div>
                    <div>
                      <button className="bg-primary text-white">save</button>
                    </div>
                  </div>
                </div>
                {/* <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Publish post
                </button> */}
              </form>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const TableThree: React.FC<any> = ({ packages, loading }) => {
  const entriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null,
  );

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const totalEntries = packages.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedPackages = packages.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const [selectedOption, setSelectedOption] = useState(''); // To store the selected option
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle dropdown visibility

  const handleOptionChange = (option: string) => {
    // Handle the option change
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-hidden mb-6">
        <div className="relative flex justify-between text-left my-12">
          <button
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedOption || 'Select Option'}{' '}
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
            className={`absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-1 ${
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
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-1"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleOptionChange('Last day')}
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
                    onChange={() => handleOptionChange('Last 7 days')}
                  />
                  <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
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
                    onChange={() => handleOptionChange('Last 30 days')}
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
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleOptionChange('Last month')}
                  />
                  <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                    Last month
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-5"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleOptionChange('Last year')}
                  />
                  <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                    Last year
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>

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
    </div>
  );
};

export default TableThree;
