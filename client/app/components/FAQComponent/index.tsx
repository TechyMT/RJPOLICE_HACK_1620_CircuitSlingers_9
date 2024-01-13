import React, { useState } from "react";

const FaqItem: React.FC<any> = ({ question, answer, isOpen, toggle }) => (
  <div className="border-t">
    <div
      className="flex justify-between items-center p-4 cursor-pointer bg-gray-200"
      onClick={toggle}
    >
      <div className="font-semibold text-blue-600">{question}</div>
      <div className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
        &#x25BE;
      </div>
    </div>
    {isOpen && (
      <div className="p-4 bg-gray-100">
        <p className="text-gray-700">{answer}</p>
      </div>
    )}
  </div>
);

const App = () => {
  const faqData = [
    {
      id: 1,
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      question: "Why do we use it?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    // Add more FAQ items as needed
  ];

  const [openFaq, setOpenFaq] = useState<any>(null);

  const toggleFaq = (id: number | null) => {
    setOpenFaq((prevOpenFaq: number | null) => (prevOpenFaq === id ? null : id));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Frequently Asked Questions
      </h1>
      {faqData.map((faq) => (
        <FaqItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isOpen={openFaq === faq.id}
          toggle={() => toggleFaq(faq.id)}
        />
      ))}
    </div>
  );
};

export default App;
