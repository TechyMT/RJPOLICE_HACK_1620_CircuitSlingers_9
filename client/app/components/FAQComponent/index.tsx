import React from "react";
import Heading from "../Heading";
import { faqs } from "../../data/constants";

const FAQComponent = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <Heading>Frequently asked questions</Heading>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
