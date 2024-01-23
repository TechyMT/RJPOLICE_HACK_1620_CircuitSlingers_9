"use client";
import Image from "next/image";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

import AwarenessImage_1 from "../../assets/images/aware_1.jpeg";
import AwarenessImage_2 from "../../assets/images/aware_2.jpeg";
import AwarenessImage_3 from "../../assets/images/aware_3.png";
import AwarenessImage_4 from "../../assets/images/aware_4.png";
import AwarenessImage_5 from "../../assets/images/aware_5.png";
import AwarenessImage_6 from "../../assets/images/aware_6.png";
import AwarenessImage_7 from "../../assets/images/aware_7.png";
import AwarenessImage_8 from "../../assets/images/aware_8.png";

const awarenessImages = [
  AwarenessImage_1,
  AwarenessImage_2,
  AwarenessImage_3,
  AwarenessImage_4,
  AwarenessImage_5,
  AwarenessImage_6,
  AwarenessImage_7,
  AwarenessImage_8,
];

interface modalProps {
  image: string;
  closeModal: () => void;
}

const AwarenessMarquee = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const isOpen = selectedImage ? true : false;

  const openModal = (image: any) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      <Marquee play={!isOpen} pauseOnHover>
        {awarenessImages.map((image, index) => (
          <div key={index} className="ml-20" onClick={() => openModal(image)}>
            <Image
              src={image}
              alt={`Awareness Image ${index + 1}`}
              className="object-cover w-full h-[45vh]"
            />
          </div>
        ))}
      </Marquee>
      {selectedImage && (
        <div
          id="image-modal"
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20 backdrop-filter backdrop-blur-md"
          onClick={closeModal}
        >
          <div className="relative">
            <button
              className="absolute top-4 right-4 text-black text-xl border-2 border-white rounded-full w-8 h-8 flex items-center justify-center bg-slate-50"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
              src={selectedImage}
              alt="Selected Image"
              className="object-contain w-[90vw] h-[90vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AwarenessMarquee;
