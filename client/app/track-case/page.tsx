"use client";
import React, { useState } from "react";
import axios from "axios";
import { publicUrl } from "../utils/publicURL";
import Heading from "../components/Heading";
import { Button, Input, Progress, Textarea } from "@nextui-org/react";
import FAQComponent from "../components/FAQComponent";
import SubHeading from "../components/SubHeading";
import Link from "next/link";
import Image from "next/image";
import trackCase from "../assets/images/track.jpg";

const TrackStatus = () => {
  const [trackId, setTrackId] = useState<any>(null);
  const [status, setStatus] = useState<any>("");

  const handleSearch = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching track status:", error);
      setStatus("Error fetching status");
    }
  };

  return (
    <div className="container items-center mx-auto mt-8 mb-48 text-center">
      <div className="m-auto mb-8 rounded-8px flex justify-center">
          <Image src={trackCase} alt="track your case" width={200} />
        </div>
        <Heading>Track your complaint</Heading>

      {/* <div className="flex items-center justify-center gap-4"> */}
        <div className="mt-10 w-96 mx-auto mb-4">
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
      {/* </div> */}

      {status && (
        <>
          {/* ... Rest of the code remains unchanged */}
        </>
      )}
    </div>
  );
};

export default TrackStatus;
