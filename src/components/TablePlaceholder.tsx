import React from 'react';

const TablePlaceholder = () => {
  return (
    <div
      
      role="status"
      className="p-4 space-y-4 border border-gray divide-y divide-gray rounded shadow animate-pulse dark:divide-graydark md:p-6 dark:border-graydark"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray rounded-full dark:bg-gray w-60 mb-2.5"></div>
          <div className="w-96 h-2 bg-gray rounded-full dark:bg-graydark"></div>
        </div>
        <div className="h-2.5 bg-gray rounded-full dark:bg-graydark w-32"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TablePlaceholder;
