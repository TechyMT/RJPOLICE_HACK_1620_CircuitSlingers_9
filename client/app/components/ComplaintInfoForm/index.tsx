import React from "react";
import { Input, Button } from "@nextui-org/react";
import AudioPlayer from "../VoicePlayer";

interface FormProps {
  formData: any;
  onChange: any;
}

const ComplaintInfoForm: React.FC<FormProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="flex flex-1 w-full gap-6">
        <div className="flex flex-col gap-10 w-1/2">
          <div className="flex flex-col w-full">
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
            <AudioPlayer audioSource="/voice/name.mp3" />
          </div>
          <div className="flex flex-col  w-full">
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
             <AudioPlayer audioSource="/voice/phone.mp3" />
          </div>
          <div className="flex flex-col  w-full">
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
             <AudioPlayer audioSource="/voice/city.mp3" />
        </div>

        <div className="flex flex-col w-full">
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
             <AudioPlayer audioSource="/voice/aadhar.mp3" />
          </div>
          <div className="flex flex-col w-full">
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
             <AudioPlayer audioSource="/voice/dob.mp3" />
          </div>
          <div className="flex flex-col  w-full">
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
             <AudioPlayer audioSource="/voice/pincode.mp3" />
            </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintInfoForm;
