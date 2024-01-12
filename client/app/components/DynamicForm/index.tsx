import { Textarea } from "@nextui-org/react";
import React from "react";

const DynamicForm: React.FC<any> = ({ onChange, formData }) => {
  console.log("formData", formData.questionnaire);
  return (
    <div className="flex flex-col gap-10 items-center">
      {formData.questionnaire.map((item: any, index: number) => (
        <div className="flex w-full">
          <Textarea
            key={index} // Added a unique key for each Textarea
            width="80%"
            label={item.question}
            placeholder="Your Response"
            value={item.response}
            classNames={{
              inputWrapper: "bg-white",
            }}
            labelPlacement="outside"
            variant="bordered"
            minRows={4}
            color="primary"
            onChange={(e) => onChange("questionnaire", e.target.value, index)} // Corrected the typo here
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
