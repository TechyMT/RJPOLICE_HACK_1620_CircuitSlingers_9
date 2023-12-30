import { Progress } from "@nextui-org/react";
interface StepAProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const StepE = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 text-center text-4xl font-bold h-screen">
      <h1>Thank you Your Tracking Id is:</h1>
      <h1> 87423015689 </h1>
      <h1>Keep This with you at all times</h1>
    </div>
  );
};
