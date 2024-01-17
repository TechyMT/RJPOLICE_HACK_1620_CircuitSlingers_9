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

const TrackStatus = () => {
  const [trackId, setTrackId] = useState<any>(null);
  const [status, setStatus] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleSearch = async () => {
    try {
      // Replace the API_URL with the actual URL for fetching the status
      setLoading(true);
      const response = await axios.get(
        `${publicUrl()}/admin/status/${trackId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);
      setStatus(response.data);
      setLoading(false);
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
    <div className="container mx-auto mt-8  mb-48">
      <div className="my-12">
        <Heading>Track your complaint</Heading>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="w-96">
          <Input
            type="number"
            placeholder="Enter Track ID"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            variant="bordered"
            color="primary"
          />
        </div>
        <Button onClick={handleSearch} color="primary" size="lg">
          Search
        </Button>
      </div>
      {status && (
        <>
          <div className="flex flex-col border-gray border-2 w-unit-9xl items-center mx-auto p-4 gap-8 mt-20">
            <div>
              <SubHeading>
                Status for Track ID:{" "}
                <span className="text-primary">{trackId}</span>
              </SubHeading>
            </div>
            <div className="flex justify-center mx-auto w-unit-8xl ">
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
            <div className="flex w-full">
              <Link href={`${status.reportURL}`}>
                <Button color="primary" size="lg">
                  Download Report
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <FAQComponent />
          </div>
        </>
      )}
    </div>
  );
};

export default TrackStatus;
