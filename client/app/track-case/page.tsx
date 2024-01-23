"use client";
import React, { useState } from "react";
import axios from "axios";
import { publicUrl } from "../utils/publicURL";
import Heading from "../components/Heading";
import { Button, Input, Progress, Textarea } from "@nextui-org/react";
import FAQComponent from "../components/FAQComponent";
import SubHeading from "../components/SubHeading";
import Link from "next/link";
import Loader from "../components/Loader";
import ModalSuggestions from "../components/SuggestionModal";

import Image from "next/image";
import trackCase from "../assets/images/track.jpg";
const TrackStatus = () => {
  const [trackId, setTrackId] = useState<any>(null);
  const [status, setStatus] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const flagNum = Math.floor(Math.random() * 3);

  const handleSearch = async () => {
    try {
      // Replace the API_URL with the actual URL for fetching the status
      setLoading(true);
      // const response = await axios.get(
      //   `${publicUrl()}/admin/status/${trackId}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log("response", response);
      setTimeout(() => {
        setStatus({
          currentStatus:
            flagNum === 0
              ? "Case File, E-FIR Register"
              : flagNum === 1
              ? "Investigating"
              : "Completed",
          flag: flagNum,
          reportDate: "21-07-2024",
          updatedDate: "22-07-2024",
          comments:
            "We are proffestionals at work, your case will be solved, please stay patient.",
          reportURL:
            "https://storage.googleapis.com/rjpolicehackathon.appspot.com/user-reports/BxgDoMHJppZlA7h6A9OcSauo7Dy1/report?GoogleAccessId=firebase-adminsdk-dlk05@rjpolicehackathon.iam.gserviceaccount.com&Expires=1707835854&Signature=XuqsAGit0OfHCDDwP6Bum8f3%2BRJyd9obWOKEXd%2FV1KnchFXrEeruwKCWr5OMVJxyEr3WIWnxu4Ln%2FmioBLco8NhimAkTtDvr6N9zHCfBdFg6IFQTA02Nka%2FwSxSglVb9UMb%2BXOBYWVz0AcXsc4I8W2satO4Pj3S0dvFqWwpGGGc4y0Vt1oCML2WosxG9cG1y9mTHoVBe25zEJGnaNs0Wmw1IALocPYrgW9arD%2B8PBcS6OC55qZCZwRI7%2FPP65aVgwO0NmdIQ6v0DSFJ9vQdiIGLamWVOAfukMqw7QZVJdD5VDxt2uqyBYNSRmDB6EnaEAhw38DiRcYqo5uHih3bJWQ%3D%3D",
          suggestions:
            "This is a demo suggestion box, you will get optimised suggestion based on your description. We have not connected it with the model. To see the full demo contact us.",
        });
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error fetching track status:", error);
      setStatus("Error fetching status");
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mt-8 mb-8 md:mb-48 p-4">
      <div className="my-6 md:my-12">
        <Heading>Track your complaint</Heading>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-60 h-36">
          <Image src={trackCase} alt="track your case" width={1920} />
        </div>
        <div className="w-96 pt-10">
          <Input
            type="number"
            placeholder="Enter Track ID"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            variant="bordered"
            color="primary"
            classNames={{
              inputWrapper: "bg-white",
            }}
          />
        </div>
        <Button onClick={handleSearch} color="primary" size="lg" className="w-full md:w-auto">
          Search
        </Button>
      </div>
      {status && (
        <>
          
          <div className="flex flex-col border-gray border-2 w-full md:w-unit-9xl items-center mx-auto p-4 gap-4 md:gap-8 mt-8 md:mt-20 bg-white bg-opacity-65">
            <div>
              <SubHeading>
                Status for Track ID:{" "}
                <span className="text-primary">{trackId}</span>
              </SubHeading>
            </div>
            <div className="flex justify-center mx-auto w-full md:w-unit-8xl ">
              <Progress
                label={"Current Status: " + status.currentStatus}
                value={status.flag === 0 ? 25 : status.flag === 1 ? 50 : 100}
                color={
                  status.flag === 0
                    ? "danger"
                    : status.flag === 1
                    ? "primary"
                    : "success"
                }
              />
            </div>
            <div className="flex w-full">
              <Textarea
                label="Comments"
                value={status.comments}
                placeholder="Your Response"
                minRows={4}
                variant="bordered"
                color="primary"
                disabled
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full">
              <Input
                label="Reported at"
                value={status.reportDate}
                placeholder="Your Response"
                variant="bordered"
                color="primary"
                disabled
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full">
              <Input
                label="Updated at"
                value={status.updatedDate}
                placeholder="Your Response"
                variant="bordered"
                color="primary"
                disabled
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full justify-between">
              <Link href={`${status.reportURL}`}>
                <Button color="primary" size="lg">
                  Download Report
                </Button>
              </Link>
              <div>
                <ModalSuggestions suggestions={status.suggestions} />
              </div>
            </div>
          </div>
          {/* <div>
            <FAQComponent />
          </div> */}
        </>
      )}
    </div>
  );
};

export default TrackStatus;
