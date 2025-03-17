"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { EditService } from "../adminDashboard/editService";
import { ServiceInterface } from "../interface";
import { motion } from "framer-motion";
import { BounceLoader, } from "react-spinners";
import Link from "next/link";

export const FindWork = () => {
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [editingService, setEditingService] = useState<ServiceInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetch = async () => {
    const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/freelancer/showWorks`
    console.log('the baseurl is', process.env.NEXT_PUBLIC_baseApiUrl);
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setServices(response.data.services);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error while fetching services at findWork.tsx", error);
    }
  };
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  useEffect(() => {
    const fetchServices = async () => {
      fetch();
    };
    fetchServices();
  }, []);

  const handleSave = () => {
    fetch();
    setEditingService(null);
  };

  const handleCancel = () => {
    setEditingService(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#6366f1" size={60} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="space-y-4 mt-6">
          {services.map((service) => (
            <motion.div
              key={service._id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-green-500 transition-colors duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {editingService && editingService._id === service._id ? (
                <EditService
                  key={service._id}
                  service={editingService}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ) : (
                <div className="flex flex-col md:flex-row">
                  {service.image !== 'noImage' && (
                    <div className="md:w-1/4 relative h-40 md:h-auto">
                      <Image
                        src={`${cloudinaryUrl}/${service.image}`}
                        alt={service.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1">
                      <Link href={`/findWork/${service._id}`}>
                        <h2 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">
                          {service.title}
                        </h2>
                      </Link>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Fixed Price: ${service.price}
                        </span>
                        
                        {/* You can add more metadata here like category, location, etc. */}
                      </div>
                      
                      <p className="text-gray-600 mt-3 line-clamp-2">{service.description}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
                      <div>
                        {service.description.length > 100 && (
                          <Link href={`/findWork/${service._id}`}>
                            <span className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
                              View details
                            </span>
                          </Link>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <button className="px-4 py-2 bg-white border border-green-600 text-green-600 rounded hover:bg-green-50 text-sm font-medium transition-colors mr-2">
                          Save
                        </button>
                        <Link href={`/findWork/${service._id}`}>
                          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition-colors">
                            Apply Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
