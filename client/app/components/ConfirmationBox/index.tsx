import React from "react";
import Logo from "../../assets/brand/logo.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import useAuthStore from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import ModalSuggestions from "../SuggestionModal";

const ConfirmationBox: React.FC<any> = ({ trackId, suggestions }) => {
  const router = useRouter();
  console.log("trackId", trackId);
  const signOut = useAuthStore((state: { signOut: any }) => state.signOut);
  const handleClose = () => {
    signOut();
    router.push("/");
  };

  if (trackId && suggestions) {
    return (
      <div className="flex flex-col items-center justify-center bg-green-50 p-10 rounded-lg shadow-md w-[70vw] max-w-screen-md mx-auto">
        <div className="flex items-center text-3xl font-extrabold mb-6">
          <div className="mr-2">
            <Image src={Logo} alt="logo" className="w-10 h-8" />
          </div>
          <div>
            <span className="text-2xl">Rajasthan Police</span>{" "}
            <span className="text-primary">Cyber Cell</span>{" "}
            <span className="text-lg">Online Reporting Portal</span>
          </div>
        </div>
        <div className="text-3xl font-bold mb-4">
          Your case has been registered successfully!
        </div>
        <div className="text-xl mb-4">
          You will receive a confirmation email shortly.
        </div>
        <div className="text-lg font-semibold mb-2">
          Your tracking ID is: <span className="text-primary">{trackId}</span>
        </div>
        <div className="text-lg font-semibold mb-4">
          Your current case status is:
          <span className="text-primary"> Pending</span>
        </div>
        <div className="text-base mb-4">
          Note: Please keep the tracking ID for future references.
        </div>
        <div className="flex space-x-4">
          <ModalSuggestions text={suggestions} />
          <Button onClick={handleClose}>Close</Button>
        </div>
      </div>
    );
  }
};

export default ConfirmationBox;
