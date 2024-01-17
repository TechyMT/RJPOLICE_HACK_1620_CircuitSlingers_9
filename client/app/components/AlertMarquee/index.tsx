import React from "react";
import Marquee from "react-fast-marquee";
import styles from "./alert.module.css"; // Importing the CSS file

const Alert = () => {
  return (
    <div className="bg-black">
      <Marquee>
        <div className="flex animate-pulse">
          <div
            className={`font-extrabold text-xl bg-clip-text m-2 ${styles.rgbText}`}
          >
            🚨 Fraud Alert: Beware of phishing emails posing as bank
            communication. They may contain malicious links aimed at stealing
            your personal financial information. Always verify the source before
            clicking any link. 🚨
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default Alert;
