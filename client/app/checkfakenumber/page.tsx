"use client";
import React, { useState } from "react";
import Image from "next/image";
import fakeNumberImage from "../assets/images/rbiguidelines.png";
import { publicUrl } from "../utils/publicURL";

const FakeNumberChecker = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFake, setIsFake] = useState<any>(null);

  const checkNumber = async () => {
    // Basic logic to determine if a number is fake or not (you can replace this with your own logic)
    // const fakePrefixes = ['555', '666', '123']; // Example fake prefixes
    // const isFakeNumber = fakePrefixes.some((prefix) => phoneNumber.startsWith(prefix));
    const response = await fetch(
      `${publicUrl()}/fraud_search/numbers/${phoneNumber}`
    );
    const { isFraud: isFakeNumber } = await response.json();
    

    setIsFake(isFakeNumber);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2em", marginBottom: "20px", color: "#333" }}>
        Fake Number Checker
      </h1>
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
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "300px",
            fontSize: "1em",
          }}
        />
        <button
          onClick={checkNumber}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "1em",
            backgroundColor: "#070288",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Check
        </button>
        {isFake !== null && (
          <p
            style={{
              marginTop: "20px",
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
