import React from "react";
import { Divider, Input, Textarea } from "@nextui-org/react";
import SubHeading from "../SubHeading";

interface FormProps {
  formData: any;
}

const ConfirmForm: React.FC<FormProps> = ({ formData }) => {
  return (
    <>
      <div className="flex flex-col gap-10 items-center w-full">
        <div>
          <Divider />

          <SubHeading>Personal Details</SubHeading>
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="Name"
            value={formData.name}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="Phone Number"
            value={formData.phoneNumber}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="DOB"
            value={formData.dob}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="City"
            value={formData.location}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="Pincode"
            value={formData.pincode}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="Have you lost money?"
            value={formData.isMoneyLost ? "Yes" : "No"}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="Adhaar Number"
            value={formData.adhaarNumber}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="Type of Complaint"
            value={formData.categoryOfComplaint}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
          <Input
            classNames={{
              inputWrapper: "bg-white",
            }}
            label="Date of Incident"
            value={formData.crimeDate}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
          />
        </div>
        <Divider />

        <SubHeading>Complaint Description</SubHeading>

        <div className="flex gap-6 w-full">
          <Textarea
            label="Complaint Description"
            value={formData.description}
            disabled
            variant="bordered"
            color="primary"
            size="lg"
            labelPlacement="outside"
            classNames={{
              inputWrapper: "bg-white",
            }}
          />
        </div>

        {formData.questionnaire && formData.questionnaire.response && (
          <>
            <Divider />
            <SubHeading>Questionnaire</SubHeading>
            {formData.questionnaire.map((question: any, index: number) => (
              <div className="flex gap-6 w-full" key={index}>
                <Textarea
                  label={question.question}
                  value={question.response}
                  disabled
                  variant="bordered"
                  color="primary"
                  size="lg"
                  labelPlacement="outside"
                  classNames={{
                    inputWrapper: "bg-white",
                  }}
                />
              </div>
            ))}
          </>
        )}
        {formData.message && (
          <>
            <Divider />
            <SubHeading>Suspicious Message</SubHeading>
            <Textarea
              label="Suspicious Message"
              value={formData.message}
              disabled
              variant="bordered"
              color="primary"
              size="lg"
              labelPlacement="outside"
              classNames={{
                inputWrapper: "bg-white",
              }}
            />
          </>
        )}

        {formData.isMoneyLost && (
          <div className="flex flex-col gap-10 items-center w-full">
            <Divider />
            <SubHeading>Victim Account Details</SubHeading>

            <div className="flex gap-6 w-full">
              <Input
                classNames={{
                  inputWrapper: "bg-white",
                }}
                label="Bank"
                value={formData.victimBank}
                disabled
                variant="bordered"
                color="primary"
                size="lg"
                labelPlacement="outside"
              />
              <Input
                classNames={{
                  inputWrapper: "bg-white",
                }}
                label="Account Number"
                value={formData.victimAccountNumber}
                disabled
                variant="bordered"
                color="primary"
                size="lg"
                labelPlacement="outside"
              />
            </div>
            <div className="flex gap-6 w-full">
              <Input
                classNames={{
                  inputWrapper: "bg-white",
                }}
                label="Transaction ID"
                value={formData.victimTransactionId}
                disabled
                variant="bordered"
                color="primary"
                size="lg"
                labelPlacement="outside"
              />
              <Input
                classNames={{
                  inputWrapper: "bg-white",
                }}
                label="Amount Lost"
                value={formData.victimAmountLost}
                disabled
                variant="bordered"
                color="primary"
                size="lg"
                labelPlacement="outside"
              />
              <Input
                classNames={{
                  inputWrapper: "bg-white",
                }}
                label="Date"
                value={formData.transactionDate}
                disabled
                variant="bordered"
                color="primary"
                size="lg"
                labelPlacement="outside"
              />
            </div>
            {formData.suspect && (
              <div className="flex flex-col gap-10 items-center w-full">
                <Divider />

                <SubHeading>Suspect Details</SubHeading>

                <div className="flex gap-6 w-full">
                  <Input
                    classNames={{
                      inputWrapper: "bg-white",
                    }}
                    label="Account Number"
                    value={formData.suspectAccountNumber}
                    disabled
                    variant="bordered"
                    color="primary"
                    size="lg"
                    labelPlacement="outside"
                  />
                  <Input
                    classNames={{
                      inputWrapper: "bg-white",
                    }}
                    label="Phone Number"
                    value={formData.suspectBank}
                    disabled
                    variant="bordered"
                    color="primary"
                    size="lg"
                    labelPlacement="outside"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmForm;
