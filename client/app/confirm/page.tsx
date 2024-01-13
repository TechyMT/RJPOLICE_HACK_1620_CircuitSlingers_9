"use client";
import React from "react";
import ConfirmationBox from "../components/ConfirmationBox";
import useAuthStore from "../utils/auth";
import { useRouter } from "next/navigation";
const Confirmation = () => {
  const router = useRouter();
  const caseDetails = useAuthStore((state) => state.caseDetails);
  console.log("caseDetails", caseDetails);
  if (!caseDetails) {
    router.push("/");
    return;
  }
  return (
    <div className="flex justify-center m-12">
      <ConfirmationBox trackId={caseDetails.trackId} />
    </div>
  );
};

export default Confirmation;
