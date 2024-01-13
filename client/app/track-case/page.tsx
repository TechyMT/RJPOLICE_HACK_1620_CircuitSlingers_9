"use client";
import React, { useState } from "react";
import axios from "axios";
import { publicUrl } from "../utils/publicURL";
import Heading from "../components/Heading";
import { Button, Input, Progress, Textarea } from "@nextui-org/react";
import FAQComponent from "../components/FAQComponent";

const TrackStatus = () => {
  const [trackId, setTrackId] = useState<any>(null);
  const [status, setStatus] = useState<any>("");

  const handleSearch = async () => {
    try {
      // Replace the API_URL with the actual URL for fetching the status
      // const response = await axios.get(`${publicUrl()}/track/${trackId}`);
      // setStatus(response.data.status);
      if (trackId === "1") {
        setStatus("Pending");
      } else if (trackId === "2") {
        setStatus("Approved");
      }
    } catch (error) {
      console.error("Error fetching track status:", error);
      setStatus("Error fetching status");
    }
  };

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
            <div className="flex justify-center mx-auto w-unit-8xl ">
              <Progress
                label={"Current Status: " + status}
                value={status === "Pending" ? 25 : 100}
                color={status === "Pending" ? "warning" : "success"}
              />
            </div>
            <div className="flex w-full">
              <Textarea
                label="Comments"
                value={"Your case is very difficult will do it later"}
                placeholder="Your Response"
                minRows={4}
                variant="bordered"
                color="primary"
                disabled
              />
            </div>
          </div>
          <div>
            <FAQComponent/>
         </div>
        </>
      )}
    </div>
  );
};

export default TrackStatus;
