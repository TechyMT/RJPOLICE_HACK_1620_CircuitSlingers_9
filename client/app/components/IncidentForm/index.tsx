"use client";
import React from "react";
import {
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Divider,
  Textarea,
} from "@nextui-org/react";
import VictimForm from "../VictimForm";
import SuspectForm from "../SuspectForm";

interface FormProps {
  formData: any;
  onChange: any;
}

const Form: React.FC<FormProps> = ({ formData, onChange }) => {
  const [lostMoney, setLostMoney] = React.useState(false);
  const [suspectAccount, setSuspectAccount] = React.useState(false);
  const handleChange = (value: string) => {
    onChange("isMoneyLost", value === "yes");
    setLostMoney(value === "yes");
  };
  const handleSuspectAccount = (value: string) => {
    onChange("suspect", value === "yes");
    setSuspectAccount(value === "yes");
  };

  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex w-full">
          <Select
            label="Category of complaint"
            labelPlacement="outside-left"
            classNames={{
              trigger: "bg-white",
              label: "w-48",
            }}
            variant="bordered"
            isRequired
            size="lg"
            onChange={(e) => {
              onChange("categoryOfComplaint", e.target.value);
            }}
            name="categoryOfComplaint"
            selectedKeys={new Set([formData.categoryOfComplaint])}
            disabledKeys={new Set(["--Select--"])}
          >
            <SelectItem key="--Select--" value={"hello"}>
              --Select--
            </SelectItem>
            <SelectItem key="hello" value={"hello"}>
              Hello
            </SelectItem>
            <SelectItem key="wow" value={"hello"}>
              Wow
            </SelectItem>
          </Select>
        </div>
        <div className="flex w-full">
          <RadioGroup
            label="Have you lost money?"
            classNames={{}}
            isRequired
            size="lg"
            orientation="horizontal"
            value={formData.isMoneyLost ? "yes" : "no"}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>
        </div>
        {formData.isMoneyLost && (
          <div className="flex flex-col w-full gap-10">
            <Divider orientation="horizontal" />
            <div className="flex p-4 bg-primary justify-center text-white w-1/6">
              Victim Account Details
            </div>
            <VictimForm formData={formData} onChange={onChange} />
            <Divider />
            <div>
              <RadioGroup
                label="Do you have suspect account details?"
                isRequired
                size="lg"
                orientation="horizontal"
                value={formData.suspect ? "yes" : "no"}
                onChange={(e) => {
                  handleSuspectAccount(e.target.value);
                }}
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>
            </div>

            {formData.suspect && (
              <div className="flex flex-col w-full gap-8">
                <Divider />
                <div className="flex p-4 bg-primary justify-center text-white w-1/6">
                  Suspect Account Details
                </div>
                <SuspectForm formData={formData} onChange={onChange} />
              </div>
            )}
          </div>
        )}
        <Divider />
        <div className="flex w-full flex-col gap-10">
          <div className="flex w-full h-[8vh]">
            <Input
              label="Approximate date & time of Incident/receiving/viewing of content "
              placeholder="Enter transaction date"
              type="date"
              value={formData.crimeDate}
              onChange={(e) => onChange("crimeDate", e.target.value)}
              isRequired
              variant="bordered"
              labelPlacement="outside-left"
              size="lg"
              classNames={{
                label: "w-[20vw] text-wrap text-start",
                inputWrapper: "w-[30vw]",
              }}
            />
          </div>
          <div>
            <Textarea
              label="Brief description of the incident"
              placeholder="Enter brief description"
              value={formData.description}
              onChange={(e) => onChange("description", e.target.value)}
              isRequired
              variant="bordered"
              labelPlacement="outside"
              size="lg"
              minRows={8}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
