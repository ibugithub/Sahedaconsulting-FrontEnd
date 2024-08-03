"use client"

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from "next/image";
import Faq from '../../assets/services-faq.jpg';

const faqData = [
  {
    question: "What industries do you serve?",
    answer: "Our expertise spans various industries, including but not limited to manufacturing, construction, technology, and infrastructure. We have a diverse team capable of addressing industry-specific challenges."
  },
  {
    question: "How do you ensure the confidentiality of sensitive information?",
    answer: "We prioritize confidentiality and have robust security measures in place. Our team adheres to strict confidentiality agreements, and we utilize secure communication channels to protect your sensitive data."
  },
  {
    question: "How do you handle unexpected challenges during a project?",
    answer: "We approach challenges proactively, leveraging our experience to find creative solutions. Communication is key, and we keep clients informed about any hurdles and work collaboratively to overcome them."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-gray-700">FAQ</h3>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-800">
            Feel free to contact us for more detailed information or if you have additional questions not covered in this FAQ.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  <p className="text-md font-semibold text-gray-800">{item.question}</p>
                  {openIndex === index ? (
                    <FaChevronUp className="text-gray-700" />
                  ) : (
                    <FaChevronDown className="text-gray-700" />
                  )}
                </div>
                {openIndex === index && (
                  <span className="mt-2 text-gray-700 block">
                    {item.answer}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="relative w-full h-64 lg:h-auto rounded-lg overflow-hidden shadow-lg">
            <Image src={Faq} layout="fill" objectFit="cover" alt="FAQ image" />
          </div>
        </div>
      </div>
    </div>
  );
};
