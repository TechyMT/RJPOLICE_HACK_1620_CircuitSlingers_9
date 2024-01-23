import React, { useState } from "react";
import { faqs } from "@/app/data/constants";
import Heading from "../Heading";
import Image from "next/image";
import HomeBg from "../../assets/images/home.png";

const FaqItem: React.FC<any> = ({ question, answer, isOpen, toggle }) => (
  <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-2">
    <div
      className="flex justify-between items-center p-4 cursor-pointer border-2 rounded-3xl"
      onClick={toggle}
    >
      <div className="font-semibold text-primary">{question}</div>
      <div className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
        &#x25BE;
      </div>
    </div>
    {isOpen && (
      <div className="p-4 bg-white">
        <p className="text-gray-700 border-2 p-6">{answer}</p>
      </div>
    )}
  </div>
);

const App = () => {
  const [openFaq, setOpenFaq] = useState<any>(null);

  const toggleFaq = (id: number | null) => {
    setOpenFaq((prevOpenFaq: number | null) =>
      prevOpenFaq === id ? null : id
    );
  };

  return (
    <>
      <Image
        src={HomeBg}
        alt="RBI guidelines"
        className="-z-50 absolute max-h-screen object-cover opacity-65 max-w-full overflow-x-hidden"
      />
      <div className="md:max-w-screen-xl mx-auto mt-8">
        <div className="flex justify-center items-center text-center">
          <Heading>Frequently Asked Questions</Heading>
        </div>
        <div className="flex flex-wrap my-12">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaq === index}
              toggle={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
