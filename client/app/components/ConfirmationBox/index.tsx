import React from "react";
import Logo from "../../assets/brand/logo.png";
import Image from "next/image";

const ConfirmationBox = () => {
  return (
    <div className="flex flex-col gap-10 bg-green-50 w-[70vw] justify-center items-center py-20">
      <div className="flex items-center text-3xl font-extrabold">
        <div>
          <Image src={Logo} alt="logo" className="w-10 h-8" />
        </div>
        <div>
          Rajasthan Police <span className="text-primary">Cyber Cell</span>{" "}
          online reporting portal
        </div>
      </div>
      <div className="flex text-2xl font-bold">
        Your Case has been registered successfully!
      </div>
      <div className="flex text-2xl font-bold">
        You will receive a confirmation email shortly.
      </div>
      <div className="flex text-xl font-semibold">
        Your case ID is: 123456789
      </div>
      <div className="flex text-xl font-semibold">
        Your current case status is:
        <span className="text-primary"> Pending</span>
      </div>
    </div>
  );
};

export default ConfirmationBox;
