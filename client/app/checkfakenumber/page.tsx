"use client";
import React, { useState } from "react";
import Image from "next/image";
import fakeNumberImage from "../assets/images/fraud.jpg";
import { publicUrl } from "../utils/publicURL";
import { Button, Input, Spinner } from "@nextui-org/react";
import Heading from "../components/Heading";
import { set } from "firebase/database";

const FakeNumberChecker = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFake, setIsFake] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkNumber = async () => {
    // Basic logic to determine if a number is fake or not (you can replace this with your own logic)
    // const fakePrefixes = ['555', '666', '123']; // Example fake prefixes
    // const isFakeNumber = fakePrefixes.some((prefix) => phoneNumber.startsWith(prefix));
    // setIsFake(isFakeNumber);
    setLoading(true);
    const response = await fetch(
      `${publicUrl()}/fraud_search/numbers/${phoneNumber}`
    );
    const { isFraud: isFakeNumber } = await response.json();

    console.log(isFakeNumber);
    setIsFake(isFakeNumber);
    setLoading(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="my-4">
        <Heading>Fake Number Checker</Heading>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "300px",
            margin: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Image src={fakeNumberImage} alt="RBI guidelines" width={1920} />
        </div>
        <div className="w-96">
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
          className="my-12"
        >
          Check
        </Button>
        {loading && (
          <p
            style={{
              margin: "20px",
              fontSize: "1.2em",
              color: isFake ? "red" : "green",
            }}
          >
            <Spinner color="primary" size="lg" />
          </p>
        )}
        {isFake !== null && !loading && (
          <p
            style={{
              margin: "20px",
              fontSize: "1.2em",
              color: isFake ? "red" : "green",
            }}
          >
            The number {phoneNumber} is {isFake ? "fake" : "not fake"}.
          </p>
        )}
      </div>
    </div>
  );
};

export default FakeNumberChecker;
