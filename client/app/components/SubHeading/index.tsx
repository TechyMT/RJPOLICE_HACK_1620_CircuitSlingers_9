import React, { ReactNode } from "react";

interface SubHeadingProps {
  children: ReactNode;
}
const SubHeading: React.FC<SubHeadingProps> = ({ children }) => {
  return (
    <div className="flex text-2xl justify-center font-semibold">{children}</div>
  );
};

export default SubHeading;
