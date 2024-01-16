import React from "react";
import Marquee from "react-fast-marquee";

const Alert = () => {
  return (
    <div className="bg-black w-full">
      <Marquee>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
          <div className="font-extrabold text-base sm:text-xl text-transparent bg-clip-text m-2 sm:m-4 bg-gradient-to-r from-green-500 via-purple-500 to-yellow-500">
            !! Alert: there is a new fraud coming up !!
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default Alert;
