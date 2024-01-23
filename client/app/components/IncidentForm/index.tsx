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
  Checkbox,
} from "@nextui-org/react";
import VictimForm from "../VictimForm";
import SuspectForm from "../SuspectForm";
import { categories } from "../../data/constants";
import EvidenceBox from "../EvidentBox";
import { uploadFiles } from "../../utils/firebase";
import useAuthStore from "../../utils/auth";
import AudioPlayer from "../VoicePlayer";

interface FormProps {
  formData: any;
  onChange: any;
}

const Form: React.FC<FormProps> = ({ formData, onChange }) => {
  const [lostMoney, setLostMoney] = React.useState(false);
  const [suspectAccount, setSuspectAccount] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const user = useAuthStore((state: { user: any }) => state.user);
  const handleChange = (value: string) => {
    onChange("isMoneyLost", value === "yes");
    setLostMoney(value === "yes");
  };
  const handleSuspectAccount = (value: string) => {
    onChange("suspect", value === "yes");
    setSuspectAccount(value === "yes");
  };

  const handleUpload = async (selectedFiles: any) => {
    try {
      if (selectedFiles.length === 0) {
        alert("No Evidence Selected!");
        return;
      }
      setLoading(true);
      const urlList = await uploadFiles(selectedFiles, user);
      onChange("evidencesURL", urlList);
      if (formData.evidencesURL) {
        alert("Evidence Uploaded!");
        setLoading(false);
      } else {
        alert("Error in uploading evidence!");
        setLoading(false);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col md:flex-row justify-start w-full gap-4">
          <Checkbox onChange={(e) => onChange("selfFill", e.target.checked)}>
            I am filling the form for myself (keep this unchecked if you are
            not)
          </Checkbox>
          <AudioPlayer audioSource="/voice/4.mp3" />
        </div>
        <div className="flex flex-col md:flex-row justify-start w-full gap-4">
          <Select
            label="Category of complaint/श्रेणी"
            labelPlacement="outside-left"
            classNames={{
              trigger: "bg-white",
              label: "w-48",
            }}
            variant="bordered"
            color="primary"
            isRequired
            size="lg"
            onChange={(e) => {
              onChange("categoryOfComplaint", e.target.value);
            }}
            name="categoryOfComplaint"
            selectedKeys={new Set([formData.categoryOfComplaint])}
            disabledKeys={new Set(["root"])}
            items={categories}
          >
            {(category) => (
              <SelectItem key={category.value}>{category.name}</SelectItem>
            )}
          </Select>
          <AudioPlayer audioSource="/voice/2.mp3" />
        </div>
        <div className="flex flex-col md:flex-row justify-start w-full gap-4">
          <RadioGroup
            label="Have you lost money?/क्या बैंक शामिल है"
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
          <AudioPlayer audioSource="/voice/3.mp3" />
        </div>
        {formData.isMoneyLost && (
          <div className="flex flex-col w-full gap-10">
            <Divider orientation="horizontal" />
            <div className="flex gap-4 p-4 bg-primary justify-center text-white md:w-1/6">
              Victim Account Details
              <AudioPlayer audioSource="/voice/victimAc.mp3" />
            </div>
            <VictimForm formData={formData} onChange={onChange} />
            <Divider />
            <div className="flex flex-col md:flex-row justify-start w-full gap-4">
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
              <AudioPlayer audioSource="/voice/QnSuscpect.mp3" />
            </div>

            {formData.suspect && (
              <div className="flex flex-col w-full gap-8">
                <Divider />
                <div className="flex p-4 bg-primary justify-center text-white md:w-1/6 gap-4">
                  Suspect Account Details
                  <AudioPlayer audioSource="/voice/suspectAc.mp3" />
                </div>
                <SuspectForm formData={formData} onChange={onChange} />
              </div>
            )}
          </div>
        )}

        <Divider />
        <div className="flex w-full flex-col gap-10">
          <div className="flex w-full md:h-[8vh] flex-col md:flex-row gap-4">
            <Input
              label="Approximate date & time of Incident/receiving/viewing of content/अपराध की तारीख'"
              placeholder="Enter transaction date"
              type="date"
              value={formData.crimeDate}
              onChange={(e) => onChange("crimeDate", e.target.value)}
              isRequired
              variant="bordered"
              labelPlacement="outside-left"
              size="lg"
              classNames={{
                label: "md:w-[20vw] text-wrap text-start",
                inputWrapper: "md:w-[30vw] bg-white",
              }}
              color="primary"
            />
            <AudioPlayer audioSource="/voice/1.mp3" />
          </div>
          <div className="flex flex-col md:flex-row justify-start w-full gap-4">
            <Textarea
              label="Brief description of the incident/घटना का विवरण"
              placeholder="Enter brief description"
              value={formData.description}
              onChange={(e) => onChange("description", e.target.value)}
              isRequired
              variant="bordered"
              labelPlacement="outside"
              size="lg"
              minRows={8}
              color="primary"
              classNames={{
                inputWrapper: "bg-white",
              }}
            />
            <AudioPlayer audioSource="/voice/briefDesc.mp3" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-start w-full gap-4">
          <Textarea
            label="Suspicious Message"
            labelPlacement="outside"
            minRows={4}
            color="primary"
            variant="bordered"
            value={formData.message}
            onChange={(e) => onChange("message", e.target.value)}
          />
          <AudioPlayer audioSource="/voice/Scam.mp3" />
        </div>
        <div>
          <div className="w-full">
            <EvidenceBox
              onChange={onChange}
              formData={formData}
              handleClick={handleUpload}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
