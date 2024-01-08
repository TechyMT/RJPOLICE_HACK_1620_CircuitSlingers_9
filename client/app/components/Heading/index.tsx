import React from "react";

interface HeadingProps {
  children: string;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <div className="flex text-4xl justify-center font-bold">{children}</div>
  );
};

export default Heading;
