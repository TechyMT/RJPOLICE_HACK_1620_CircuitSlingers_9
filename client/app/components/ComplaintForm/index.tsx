"use client";
import {
  Input,
  Button,
  Select,
  Textarea,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import useAuthStore from "../../utils/auth";
import Heading from "../Heading";
import Form from "../IncidentForm";
import ComplaintInfoForm from "../ComplaintInfoForm";
import { publicUrl } from "../../utils/publicURL";
import ConfirmForm from "../ConfirmForm";
import { questionaire } from "../../data/constants";
import DynamicForm from "../DynamicForm";
import { useRouter } from "next/navigation";

export const categories = [
  "Identity Fraud",
  "Criminal Trespass",
  "Cyber Threats",
  "Other",
];

export const stepperTitles = [
  "Incident Details",
  "Questionare",
  "Complaint Details",
  "Confirmation",
];

const ComplaintForm = () => {
  const setCaseDetails = useAuthStore((state) => state.setCaseDetails);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    phoneNumber: "",
    location: "",
    pincode: "",
    description: "",
    categoryOfComplaint: "root",
    questionnaire: [],
    evidencesURL: [],
    isMoneyLost: false,
    victimBank: "root",
    victimAccountNumber: "NA",
    victimTransactionId: "NA",
    victimAmountLost: "NA",
    suspect: false,
    suspectBank: "root",
    suspectAccountNumber: "NA",
    suspectPhoneNumber: "NA",
    suspectTransactionId: "NA",
    transactionDate: "NA",
    crimeDate: "",
    dob: "",
    adhaarNumber: "",
    evidencesList: [],
    selfFill: false,
  });
  const [step, setStep] = useState(1);
  const [dynamicForm, setDynamicForm] = useState<any>(null);

  const handleInputChange = (field: string, value: string, index?: number) => {
    if (index !== undefined) {
      const { questionnaire } = formData;
      console.log("questionnare value", questionnaire[index]);
      questionnaire[index].response = value;
      setFormData((prevData: any) => ({
        ...prevData,
        questionnaire,
      }));
      return;
    }
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handlePrev = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 1) {
      if (
        formData.evidencesURL.length === 0 &&
        formData.evidencesList.length !== 0
      ) {
        alert("Please upload evidence");
        return;
      }

      const data = await fetch(`${publicUrl()}/report/generateQuestions`, {
        method: "POST",
        body: JSON.stringify(formData.description),
      });
      const { questions } = await data.json();

      // console.log("questions", questions);

      questions &&
        setFormData((prevData: any) => ({
          ...prevData,
          questionnaire: questions,
        }));
    } else if (step === 4) {
      // Handle form submission logic here
      console.log("Form Data:", formData);
      console.log("user", user);
      setSubmitLoading(true);
      // Reset the form after submission if needed
      const body = {
        email: user.email,
        userIdentification: "zBwRffRwdANSB1jsTgbee4zfF392",
        fullName: formData.name,
        dateOfBirth: formData.dob,
        aadharNumber: formData.adhaarNumber,
        incidentDescription: formData.description,
        dateOfCrime: formData.crimeDate,
        dateOfReport: new Date().toISOString(),
        phoneNumber: formData.phoneNumber,
        evidencesURL: [],
        city: formData.location,
        pincode: formData.pincode,
        category: formData.categoryOfComplaint,
        userAccountInfo: {
          amountLost: formData.victimAmountLost,
          bankName: formData.victimBank,
          accountNumber: formData.victimAccountNumber,
          dateOfTransaction: formData.transactionDate,
          transaction: formData.victimTransactionId,
        },
        suspectInfo: {
          suspectBankName: formData.suspectBank,
          suspectAccountNumber: formData.suspectAccountNumber,
          suspectPhoneNumber: formData.suspectPhoneNumber,
        },
        recipientToken: "",
        isBankAccInvolved: formData.isMoneyLost,
        questionnaire: formData.questionnaire,
      };
      console.log("body", body);

      const data = await fetch(`${publicUrl()}/report/add`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      });
      const response = await data.json();

      setFormData({
        name: "",
        phoneNumber: "",
        location: "",
        pincode: "",
        description: "",
        categoryOfComplaint: "root",
        isMoneyLost: false,
        victimBank: "root",
        victimAccountNumber: "NA",
        victimTransactionId: "NA",
        victimAmountLost: "NA",
        suspect: false,
        suspectBank: "root",
        suspectAccountNumber: "NA",
        suspectPhoneNumber: "NA",
        suspectTransactionId: "NA",
        transactionDate: "NA",
        evidencesURL: [],
        crimeDate: "",
        dob: "",
        adhaarNumber: "",
        evidencesList: [],
        questionnaire: [],
        selfFill: false,
      });
      setSubmitLoading(false);
      setCaseDetails(response);
      router.push(`/confirm`);
    }

    // Move to the next step or submit the form
    setStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
  };

  return (
    <div className="flex flex-col justify-around items-center gap-10 py-8 ">
      <div className="flex">
        <Heading>Complaint Form</Heading>
      </div>
      <div className="flex flex-col w-[80vw] gap-10">
        <div className="flex-1 ">
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
                  {index === 2 && index > step && (
                    <span className="me-2">2</span>
                  )}
                  {index === 3 && index > step && (
                    <span className="me-2">3</span>
                  )}
                  {index === 4 && index > step && (
                    <span className="me-2">4</span>
                  )}
                  {index === 1 && (
                    <span className="hidden sm:inline-flex sm:ms-2">
                      {stepperTitles[index - 1]}
                    </span>
                  )}
                  {index === 2 && (
                    <span className="hidden sm:inline-flex sm:ms-2">
                      {stepperTitles[index - 1]}
                    </span>
                  )}
                  {index === 3 && (
                    <span className="hidden sm:inline-flex sm:ms-2">
                      {stepperTitles[index - 1]}
                    </span>
                  )}
                  {index === 4 && <span>Confirmation</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Form formData={formData} onChange={handleInputChange} />
            )}

            {step === 2 && (
              <>
                {formData.questionnaire && (
                  <DynamicForm
                    formData={formData}
                    onChange={handleInputChange}
                  />
                )}
              </>
            )}

            {step === 3 && (
              <ComplaintInfoForm
                formData={formData}
                onChange={handleInputChange}
              />
            )}
            {step === 4 && <ConfirmForm formData={formData} />}
            <div className="flex justify-between">
              {step > 1 && step <= 4 && (
                <div className="flex py-10">
                  <Button color="primary" size="lg" onClick={handlePrev}>
                    Prev
                  </Button>
                </div>
              )}
              <div className="flex py-10">
                <Button color="primary" type="submit" size="lg">
                  {step < 4 ? (
                    "Next"
                  ) : submitLoading ? (
                    <Spinner />
                  ) : (
                    "Submit Complaint"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
