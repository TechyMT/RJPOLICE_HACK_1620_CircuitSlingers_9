import React from "react";
import { Input, Button } from "@nextui-org/react";

interface FormProps {
  formData: any;
  onChange: any;
}

const ComplaintInfoForm: React.FC<FormProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="flex flex-1 w-full gap-6">
        <div className="flex flex-col gap-10 w-1/2">
          <Input
            label="Name/पूरा नाम"
            placeholder="Enter your name"
            type="text"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            isRequired
            variant="bordered"
            color="primary"
            labelPlacement="outside"
            size="lg"
          />

          <Input
            label="Phone Number/फ़ोन नंबर"
            placeholder="Enter your Phone Number"
            type="number"
            value={formData.phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            isRequired
            variant="bordered"
            color="primary"
            labelPlacement="outside"
            size="lg"
          />
          <Input
            label="City/शहर"
            placeholder="Enter your city"
            type="text"
            value={formData.location}
            onChange={(e) => onChange("location", e.target.value)}
            isRequired
            variant="bordered"
            color="primary"
            labelPlacement="outside"
            size="lg"
          />
        </div>

        <div className="flex gap-10 flex-col w-1/2">
          <Input
            label="Aadhaar Number/आधार नंबर"
            placeholder="Enter your Adhaar Number"
            type="number"
            value={formData.adhaarNumber}
            onChange={(e) => onChange("adhaarNumber", e.target.value)}
            isRequired
            variant="bordered"
            color="primary"
            labelPlacement="outside"
            size="lg"
          />

          <Input
            label="Date of Birth/जन्म की तारीख"
            placeholder="Enter your Date of Birth"
            type="date"
            value={formData.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            isRequired
            variant="bordered"
            color="primary"
            labelPlacement="outside"
            size="lg"
          />
          <Input
            label="Pincode/पिनकोड"
            placeholder="Enter your Pincode"
            type="number"
            value={formData.pincode}
            onChange={(e) => onChange("pincode", e.target.value)}
            isRequired
            variant="bordered"
            color="primary"
            labelPlacement="outside"
            size="lg"
          />
        </div>
      </div>
    </>
  );
};

export default ComplaintInfoForm;
