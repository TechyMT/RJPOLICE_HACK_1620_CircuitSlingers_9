import React from 'react';

const WidgetPlaceholder = () => {
  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      
<div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div>


    </div>
  );
};

export default WidgetPlaceholder;
