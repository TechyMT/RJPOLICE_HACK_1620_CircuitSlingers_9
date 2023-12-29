import { Progress } from "@nextui-org/react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
interface StepAProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const StepB: React.FC<StepAProps> = ({
  handleNextStep,
  handlePreviousStep,
}) => {
  return (
    <div>
      <div className="flex justify-center max-w-3xl mx-auto mt-20">
        <Progress
          aria-label="Loading..."
          label="Step 2"
          value={33.33}
          className="max-w-md"
        />
      </div>
      <div className="max-w-2xl mx-auto mt-8">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Give us a detailed description
        </label>
        <textarea
          id="message"
          rows={20}
          className="block p-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          className="w-[135px] mr-20"
          color="primary"
          variant="shadow"
          type="submit"
          onClick={handlePreviousStep}
        >
          <p className="text-white">Previous</p>
        </Button>
        <Button
          className="w-[135px]"
          color="primary"
          variant="shadow"
          type="submit"
          onClick={handleNextStep}
        >
          <p className="text-white">Next</p>
        </Button>
      </div>
    </div>
  );
};
