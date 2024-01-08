import React from "react";
import { Input } from "@nextui-org/react";

interface FormProps {
  formData: any;
  onChange: any;
}

const Form: React.FC<FormProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="flex gap-10">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
          variant="bordered"
          color="primary"
        />
        <Input
          label="Phone Number"
          placeholder="Enter your phone number"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
          required
          variant="bordered"
          color="primary"
        />
      </div>
      <Input
        label="Location"
        placeholder="Enter your location"
        value={formData.location}
        onChange={(e) => onChange("location", e.target.value)}
        required
        variant="bordered"
        color="primary"
      />
    </>
  );
};

export default Form;
