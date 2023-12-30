"use client";
import { Input_Box } from "@/components/input";
import { Input, Textarea, Button, Spinner } from "@nextui-org/react";
import { Cards } from "@/components/cards";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";

const Landing = () => {
  const [hasGivenPrompt, setHasGivenPrompt] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState("Your output would be displayed here");
  const [textInputData, setTextInputData] = useState("");

  const handleButtonClick = async () => {
    if (textInputData === "") {
      setInvalidInput(true);
      return;
    } else {
      !hasGivenPrompt && setHasGivenPrompt(true);
      setIsLoading(true);
      const inputQuery = {
        query: textInputData,
      };
      // console.log(inputQuery);
      const jsonRequestBody = JSON.stringify(inputQuery);
      console.log(jsonRequestBody);
      const apiUrl = "api/chat";
      try {
        const response = await axios.post(apiUrl, jsonRequestBody, {
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
        });

        console.log(response.data.title.Response);
        setApiData(response.data.title.Response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTextInputData(newValue);
  };
  return (
    <div>
      <div>
        <div className="max-w-3xl mx-auto mt-20 text-center text-4xl font-bold">
          <h1>Securing the Digital Community</h1>
        </div>
        <div className="max-w-3xl mx-auto mt-8 text-center text-4xl font-bold">
          <h1>Dial 1930</h1>
          <div className="flex flex-col items-center mt-8">
            <div className="w-96 h-16 mb-8">
              <Input
                type=""
                variant="flat"
                label="Ask me anything"
                size="lg"
                className=""
                isInvalid={invalidInput}
                // defaultValue={samplePrompt}
                onChange={handleInputChange}
                value={textInputData}
              />
            </div>
            <div>
              <Button
                onClick={handleButtonClick}
                className="inline-flex text-black"
              >
                Submit
              </Button>
            </div>
            {hasGivenPrompt &&
              (isLoading ? ( // Check isLoading to render the Spinner
                <div className="text-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <Textarea
                  isReadOnly
                  variant="faded"
                  labelPlacement="outside"
                  defaultValue={apiData}
                  size="lg"
                  className="mt-8"
                />
              ))}
            <div className="mt-8">
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
