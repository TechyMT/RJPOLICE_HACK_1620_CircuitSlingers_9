import React from "react";
import Marquee from "react-fast-marquee";

const Alert = () => {
  return (
    <div className="bg-black">
      <Marquee>
        <div className="flex animate-pulse">
          <div className="font-extrabold text-xl text-transparent bg-clip-text m-2 bg-gradient-to-r from-green-500 via-purple-500 to-yellow-500">
           !! Alert: there is a new fraud coming up !!
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default Alert;
