import Image from "next/image";
import mission from '../../assets/mission.jpg';
import { FaCheckCircle } from 'react-icons/fa';

export const Mission = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="relative h-64 w-full lg:w-1/2 mb-8 lg:mb-0 lg:mr-8 rounded-lg overflow-hidden shadow-lg">
            <Image src={mission} layout="fill" objectFit="cover" alt="Our mission" />
          </div>
          <div className="text-center lg:text-left lg:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700">OUR MISSION</h2>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Turn Ideas Into Reality</h1>
            <p className="mt-4 text-md text-gray-800">
              The mission of our engineering consulting service company is to deliver comprehensive engineering, management, and IT solutions with precision and innovation. We aim to empower clients, optimize processes, and drive technological excellence to meet the evolving challenges of today’s dynamic business landscape.
            </p>
            <div className="mt-12">
              <div className="flex items-center lg:items-start gap-5">
                <div className="flex  justify-start">
                  <FaCheckCircle className="text-blue-600 text-2xl mr-1" />
                  <div className="flex flex-col text-gray-800">
                    <span className="text-lg font-medium">Engineering</span>
                    <span className="text-lg">80%</span>
                  </div>
                </div>
                <div className="flex  justify-start">
                  <FaCheckCircle className="text-green-600 text-2xl mr-1" />
                  <div className="flex flex-col text-gray-800">
                    <span className="text-lg font-medium">Management</span>
                    <span className="text-lg">90%</span>
                  </div>
                </div>
                <div className="flex  justify-start">
                  <FaCheckCircle className="text-red-600 text-2xl mr-1" />
                  <div className="flex flex-col text-gray-800">
                    <span className="text-lg font-medium">IT</span>
                    <span className="text-lg">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
