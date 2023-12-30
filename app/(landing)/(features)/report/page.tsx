"use client";
import { StepA } from "@/components/stepA";
import { StepB } from "@/components/stepB";
import { StepC } from "@/components/stepC";
import { StepD } from "@/components/stepD";
import { StepE } from "@/components/final_page";
import React, { useEffect, useState } from "react";

const stepsArray = ["A", "B", "C", "D", "E"];

interface SimpleMultiStepFormProps {
  showStepNumber: boolean;
}

const SimpleMultiStepForm: React.FC<SimpleMultiStepFormProps> = ({
  showStepNumber,
}) => {
  const [step, setStep] = useState("A");
  // We need a method to go to next step
  const handleNextStep = () => {
    if (step === "A") setStep("B");
    else if (step === "B") setStep("C");
    else if (step === "C") setStep("D");
    else if (step === "D") setStep("E");
  };
  const handlePrevStep = () => {
    if (step === "E") setStep("D");
    else if (step === "D") setStep("C");
    else if (step === "C") setStep("B");
    else if (step === "B") setStep("A");
  };
  const renderTopStepNumbers = () => {
    if (!showStepNumber || step === "Final") {
      return null;
    }
  };
  return (
    <div>
      {renderTopStepNumbers()}
      {step === "A" ? <StepA handleNextStep={handleNextStep} /> : null}
      {step === "B" ? (
        <StepB
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePrevStep}
        />
      ) : null}
      {step === "C" ? (
        <StepC
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePrevStep}
        />
      ) : null}
      {step === "D" ? (
        <StepD
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePrevStep}
        />
      ) : null}
      {step === "E" ? <StepE /> : null}
    </div>
  );
};

export default SimpleMultiStepForm;
