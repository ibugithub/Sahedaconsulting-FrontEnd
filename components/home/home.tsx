import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col p-[1rem] md:p-[6rem]">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center bg-gray-900 text-white py-12 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Unleash Your Potential with Our Consulting
          </h1>
          <p className="text-lg md:text-xl mb-8">
            We provide cutting-edge solutions to transform your business and stay ahead of the curve.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
            Get Started
          </button>
        </div>
      </div>

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
              <h3 className="text-xl font-bold mb-2 text-gray-900">Software Development</h3>
              <p className="text-gray-500">
                Our skilled developers create custom software solutions to streamline your operations.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Cloud Services</h3>
              <p className="text-gray-500">
                Leverage the power of cloud computing to scale your business and reduce costs.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Cybersecurity</h3>
              <p className="text-gray-500">Protect your data and systems with our robust cybersecurity solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;