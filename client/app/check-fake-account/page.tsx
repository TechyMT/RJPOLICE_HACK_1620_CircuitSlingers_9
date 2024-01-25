"use client";
import React, { useState } from "react";
import Image from "next/image";
import fakeNumberImage from "../assets/images/fake_1.jpg";
import { publicUrl } from "../utils/publicURL";
import Heading from "../components/Heading";
import { Button, Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import Loader from "../components/Loader";

const FakeNumberChecker: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isFake, setIsFake] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const checkNumber = async () => {
    // Basic logic to determine if a number is fake or not (you can replace this with your own logic)
    setLoading(true);
    try {
      // const response = await fetch(
      //   `${publicUrl()}/fraud_search/accounts/${phoneNumber}`
      // );
      // const { isFraud: isFakeNumber } = await response.json();

      setTimeout(() => {
        setIsFake(Math.random() >= 0.5);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="my-4">
        <Heading>Fake Bank Account Checker</Heading>
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
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter bank account"
            color="primary"
            variant="bordered"
            classNames={{ inputWrapper: "bg-white" }}
            size="lg"
          />
        </div>
        <Button
          onClick={checkNumber}
          color="primary"
          className="my-12"
          size="lg"
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
        {isFake && !loading && (
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
