import React from 'react';
import civil from '../../assets/civil.png';
import management from '../../assets/earth.png';
import it from '../../assets/it.png';
import Image from 'next/image';

const servicesData = [
  {
    title: 'Engineering Consulting Services',
    description: [
      'Infrastructure',
      'Sustainability',
      'Environmental Engineering',
      'Transportation Engineering',
      'Building Engineering',
      'Structural Engineering',
      'Architecture',
      'Product Development',
      'Rural Development and Industrial Infrastructure',
      'Industrial Eco-park & Smart City Design Along with Feasibility Studies'
    ],
    icon: (
      <Image src={civil} alt='this is engineering icon' height={50} width={50} />
    )
  },
  {
    title: 'Management Consulting Service',
    description: [
      'Business Management Support Services',
      'Performance Management Services',
      'Industrial Activities Management',
      'Educational Support Services',
      'Organizational Restructuring Services'
    ],
    icon: (
      <Image src={management} alt='this is management icon' height={50} width={50} />
    )
  },
  {
    title: 'IT Consulting Service',
    description: [
      'Graphic Design',
      'Web Design and Development',
      'Social Media Marketing',
      'Troubleshooting and Technical Support',
      'Remote Support'
    ],
    icon: (
      <Image src={it} alt='this is it icon' height={50} width={50} />
    )
  }
];

export const Services = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h4 className="text-lg font-semibold text-gray-600">Our Services</h4>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900">We Create Best Digital Products</h1>
        <div className="mt-10 flex flex-wrap justify-center">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md m-4 p-6 w-full sm:w-72 transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              <ul className="mt-4 text-gray-600 list-disc list-inside text-left">
                {service.description.map((item, idx) => (
                  <li key={idx} className="mt-2 list-none">
                    <span className="flex items-center">
                      <svg className="h-4 w-4 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
