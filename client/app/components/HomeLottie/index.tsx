import React from "react";
import { useLottie } from "lottie-react";
import data from "../../lotties/home.json";

const HomeLottie: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };
  const { View } = useLottie(defaultOptions);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start mt-28 absolute">
      <div className="h-1/4 w-1/4">{View}</div>
    </div>
  );
};

export default HomeLottie;
