"use client";
import { Input, Button, Select, Textarea, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import useAuthStore from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import Form from "../FormPart_1";

const categories = [
  "Identity Fraud",
  "Criminal Trespass",
  "Cyber Threats",
  "Other",
];

const ComplaintForm = () => {
  //   const router = useRouter();
  //   const loggedIn = useAuthStore((state) => state.isLogedIn);

  //   if (!loggedIn) {
  //     // Redirect to the signin page if not logged in
  //     router.push("/signin");
  //     return null;
  //   }

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    location: "",
    category: "",
    description: "",
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (field: string, value: string) => {
    console.log("value", value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
    // Reset the form after submission if needed
    setFormData({
      name: "",
      phoneNumber: "",
      location: "",
      category: "",
      description: "",
    });
    // Move to the next step or submit the form
    setStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
  };

  return (
    <div className="flex flex-col justify-around items-center ">
      <div className="flex">
        <Heading>Complaint Form</Heading>
      </div>
      <div className="flex-1 w-[80vw]">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          {[1, 2, 3, 4].map((index) => (
            <li
              key={index}
              className={`flex md:w-full items-center ${
                index <= step ? "text-blue-600 dark:text-blue-500" : ""
              } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
            >
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {index <= step && (
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                )}
                {index === 2 && index > step && <span className="me-2">2</span>}
                {index === 3 && index > step && <span className="me-2">3</span>}
                {index === 4 && index > step && <span className="me-2">4</span>}
                {index === 1 && (
                  <span className="hidden sm:inline-flex sm:ms-2">
                    Incident Details
                  </span>
                )}
                {index === 2 && (
                  <span className="hidden sm:inline-flex sm:ms-2">
                    Suspect Details
                  </span>
                )}
                {index === 3 && (
                  <span className="hidden sm:inline-flex sm:ms-2">
                    Complaint Details
                  </span>
                )}
                {index === 4 && <span>Confirmation</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex-1 mb-20 min-w-[80vw] ">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Form formData={formData} onChange={handleInputChange} />
          )}

          {step === 2 && (
            <>
              <Select
                label="Category"
                placeholder="Select a category"
                value={formData.category}
                onChange={(value) => handleInputChange("category", value)}
                required
                variant="bordered"
                color="primary"
              >
                {categories.map((category) => (
                  <SelectItem key={category}>{category}</SelectItem>
                ))}
              </Select>
              <Textarea
                label="Description of Crime"
                placeholder="Describe the crime"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
                variant="bordered"
                color="primary"
              />
            </>
          )}

          {step === 3 && (
            <div>
              <p>Confirmation Content Goes Here</p>
            </div>
          )}
          {step === 4 && (
            <div>
              <p>Confirmation Content Goes Here</p>
            </div>
          )}

          <Button type="submit" color="primary">
            {step < 4 ? "Next" : "Submit Complaint"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;