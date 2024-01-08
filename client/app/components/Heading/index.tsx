import React from "react";

interface HeadingProps {
  content: string;
}

const Heading: React.FC<HeadingProps> = ({ content }) => {
  return (
    <div className="flex text-4xl justify-center font-bold">{content}</div>
  );
};

export default Heading;
