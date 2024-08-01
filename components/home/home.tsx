import React from 'react';
import service1 from '../../assets/service1.jpg'
import service2 from '../../assets/service2.jpg' 
import service3 from '../../assets/service3.jpg'
import Image from 'next/image';
import Overview from '../overview/Overview';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col p-[1rem] md:p-[6rem]">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center bg-gray-900 text-white py-12 lg:py-24">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to Ghost Engineering Consulting Service
          </h1>
          <p className="text-lg md:text-xl mb-8">
            where innovation meets expertise in engineering, management, and IT
            solutions.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mr-3">
            See Our Services
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
            Let's connect
          </button>
        </div>
      </div>
      {/* Overview Section */}
      <Overview />
      {/* Services Section */}
      <div className="bg-gray-100 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Our Services</h2>
            <p className="text-lg text-gray-500 mt-4">
              Explore our comprehensive range of IT and engineering services tailored to your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Image src={service1} alt="Engineering Consulting" className="w-full h-48 object-cover mb-4 rounded-t-lg" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Engineering Consulting</h3>
              <p className="text-gray-500">
                In the realm of engineering, Saheda Consulting boasts a team of seasoned professionals dedicated to turning your visions into reality. From conceptualization to execution, we ensure precision and creativity in every project, be it construction, infrastructure upgrades, or sustainable solutions.
              </p>
              <a href="/services/engineering-consulting" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Learn More</a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Image src={service2} alt="Management Consulting" className="w-full h-48 object-cover mb-4 rounded-t-lg" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Management Consulting</h3>
              <p className="text-gray-500">
                Our management consulting services are designed to elevate your strategic decision-making. Collaborating closely with your leadership team, we identify growth opportunities, enhance operational efficiency, and implement strategic initiatives that drive organizational success.
              </p>
              <a href="/services/management-consulting" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Learn More</a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Image src={service3} alt="IT Consulting" className="w-full h-48 object-cover mb-4 rounded-t-lg" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">IT Consulting</h3>
              <p className="text-gray-500">
                In the dynamic world of information technology, Saheda Consulting offers cutting-edge solutions. Our IT experts deliver innovative and scalable services, from system integration to cybersecurity, ensuring your technology infrastructure is a catalyst for growth.
              </p>
              <a href="/services/it-consulting" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Learn More</a>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;