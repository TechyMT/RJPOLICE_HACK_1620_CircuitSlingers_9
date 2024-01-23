"use client";
import React, { useState } from "react";
import Image from "next/image";
import fakeNumberImage from "../assets/images/fraud.jpg";
import { publicUrl } from "../utils/publicURL";
import { Button, Input, Spinner } from "@nextui-org/react";
import Heading from "../components/Heading";
import Loader from "../components/Loader";

const FakeNumberChecker = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFake, setIsFake] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkNumber = async () => {
    // Basic logic to determine if a number is fake or not (you can replace this with your own logic)
    // const fakePrefixes = ['555', '666', '123']; // Example fake prefixes
    // const isFakeNumber = fakePrefixes.some((prefix) => phoneNumber.startsWith(prefix));
    // setIsFake(isFakeNumber);
    try {
      setLoading(true);
      // const response = await fetch(
      //   `${publicUrl()}/fraud_search/numbers/${phoneNumber}`
      // );
      // const { isFraud: isFakeNumber } = await response.json();
      setTimeout(() => {
        setIsFake(Math.random() >= 0.5);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log("error while checking fake number");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto mt-8 mb-8 md:mb-48 p-4 text-center">
      <div className="my-4">
        <Heading>Fake Number Checker</Heading>
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-[300px] mx-auto my-4 rounded-md shadow-md overflow-hidden">
          <Image src={fakeNumberImage} alt="RBI guidelines" width={1920} height={1080} />
        </div>
        <div className="w-full md:w-96">
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            color="primary"
            variant="bordered"
            size="lg"
          />
        </div>
        <Button
          onClick={checkNumber}
          color="primary"
          size="lg"
          className="my-4 md:my-12"
        >
          Check
        </Button>
        {loading && (
          <p className="my-4 text-lg">
            <Spinner color="primary" size="lg" />
          </p>
        )}
        {isFake !== null && !loading && (
          <p
            className={`my-4 text-lg ${
              isFake ? "text-red-500" : "text-green-500"
            }`}
          >
            The number {phoneNumber} is {isFake ? "fake" : "not fake"}.
          </p>
        )}
      </div>
    </div>
  );
};

export default FakeNumberChecker;
