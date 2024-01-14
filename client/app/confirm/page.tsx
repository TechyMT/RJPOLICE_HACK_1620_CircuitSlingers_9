"use client";
import React from "react";
import ConfirmationBox from "../components/ConfirmationBox";
import useAuthStore from "../utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import usePush from "../components/usePush";
const Confirmation = () => {
  const router = usePush();
  const caseDetails = useAuthStore(
    (state: { caseDetails: any }) => state.caseDetails
  );
  console.log("caseDetails", caseDetails);
  useEffect(() => {
    if (!caseDetails) {
      router("/");
      return;
    }
  }, []);
  caseDetails && (
    <div className="flex justify-center m-12">
      <ConfirmationBox trackId={caseDetails.trackId} />
    </div>
  );
};

export default Confirmation;
