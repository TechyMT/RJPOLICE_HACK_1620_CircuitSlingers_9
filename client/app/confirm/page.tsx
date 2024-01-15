"use client";
import React from "react";
import ConfirmationBox from "../components/ConfirmationBox";
import useAuthStore from "../utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import usePush from "../components/usePush";
const Confirmation = () => {
  const [caseData, setCaseData] = React.useState<any>(null);
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
    setCaseData(caseDetails);
  }, []);
  if (caseData)
    return (
      <div className="flex justify-center m-12">
        <ConfirmationBox trackId={caseData.trackId} suggestions={caseDetails.suggestions} />
      </div>
    );
};

export default Confirmation;
