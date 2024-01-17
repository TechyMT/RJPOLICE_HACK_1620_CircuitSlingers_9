"use client";
import React, { useState } from "react";
import ReportImage from "../assets/images/report.png";
import Image from "next/image";
import { Input, Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { publicUrl } from "../utils/publicURL";
import Loader from "../components/Loader";
const ReportMail = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${publicUrl()}/fraud_search/reportEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      setMessage(data.message);
      setEmail("");
      setLoading(false);
    } catch (error) {
      console.log("error reporting email");
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-20 mb-20">
      <div className="flex">
        <Image src={ReportImage} alt="report" width={400} height={1080} />
      </div>
      <div className="flex items-center gap-4 ">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          variant="bordered"
          onChange={(e: any) => setEmail(e.target.value)}
          color="primary"
          size="lg"
        />
        <Button color="primary" onClick={handleClick} size="lg">
          {loading ? <Spinner size="lg" color="white" /> : "Save"}
        </Button>
      </div>
      {message && (
        <div className="text-red-400 font-semibold animate-pulse text-2xl">
          {message}
        </div>
      )}
    </div>
  );
};

export default ReportMail;
