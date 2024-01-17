import React from 'react';

const Line = ({ className }: { className: string }) => {
  return (
    <>
      <hr
        className={`h-px my-8 bg-graydark border-0 dark:bg-gray ${className}`}
      />
    </>
  );
};

export default Line;
