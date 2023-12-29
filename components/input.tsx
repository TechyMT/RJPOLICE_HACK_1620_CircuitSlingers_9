import React from "react";
import { Input } from "@nextui-org/react";

interface InputProps {
  type: string;
  label: string;
}

export const Input_Box: React.FC<InputProps> = ({ type, label }) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type={type} label={label} />
    </div>
  );
};
