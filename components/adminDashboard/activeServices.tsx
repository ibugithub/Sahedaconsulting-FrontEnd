"use client";

import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { EditService } from "./editService";
import { toast } from "react-toastify";
import { ServiceInterface } from "../interface";
import { motion } from "framer-motion";
import { BounceLoader, } from "react-spinners";
import Link from "next/link";
import { AxiosRequests } from "../utils/axiosRequests";
import { useRouter } from "next/navigation";
import { ServiceNav } from "./serviceNav";


export const ShowServices = () => {
  const router = useRouter();
  const protectedRoute = AxiosRequests();
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [editingService, setEditingService] = useState<ServiceInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  const fetch = async () => {
    const url = `/admin/showServices`
    try {
      const response = await protectedRoute.get(url);
      console.log('the response is', response)
      setServices(response.data.services);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error while fetching services at service.tsx", error);
      if (error.response.status === 401) {
        toast.error("Unauthorized");
        router.push("/signin");
        return;
      }
    }
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (service: ServiceInterface) => {
    setError("");
    setEditingService(service);
  };

  const handleSave = () => {
    fetch();
    setEditingService(null);
  };

  const handleCancel = () => {
    setEditingService(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `/admin/del/${id}`
      await protectedRoute.delete(url);
      fetch();
      toast.success("Service Trashed successfully");
      setError("");
    } catch (err: any) {
      console.error("Error Trashing service", err);
      if (err.response.data.customCode === 17) {
        setError(err.response.data.error);
      } else if (err.response.status === 401) {
        toast.error("Unauthorized");
        router.push("/signin");
        return;
      }
    }
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
      <div className="max-w-6xl mx-auto px-4">
        <ServiceNav />
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
          <Link href={'/adminDashboard/uploadService'}>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Service
            </button>
          </Link>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 focus:outline-none"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 focus:outline-none">
              <option>Sort by: Latest</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
              <option>Sort by: Title (A-Z)</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
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
                  {service.image && service.image !== 'noImage' && (
                    <div className="md:w-1/4 relative h-48 md:h-auto">
                      <Image
                        src={`${cloudinaryUrl}/${service.image}`}
                        alt={service.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/adminDashboard/serviceDetails/${service._id}`}>
                          <h2 className="text-xl font-bold text-gray-800 hover:text-green-600 transition-colors">
                            {service.title}
                          </h2>
                        </Link>
                        <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-green-700">${service.price}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          ID: {service._id.substring(0, 8)}...
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      
                      {service.description.length > 100 && (
                        <Link href={`/adminDashboard/serviceDetails/${service._id}`} passHref>
                          <span className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors inline-flex items-center cursor-pointer">
                            View details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </Link>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">Created on: {new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded text-sm font-medium hover:bg-blue-50 transition-colors duration-300"
                          onClick={() => handleEdit(service)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 border border-red-600 text-red-600 rounded text-sm font-medium hover:bg-red-100 transition-colors duration-300"
                          onClick={() => handleDelete(service._id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          
          {services.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Services Found</h3>
              <p className="mt-2 text-gray-500">You haven&apos;t created any services yet.</p>
              <Link href={'/adminDashboard/uploadService'}>
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition-colors">
                  Add Your First Service
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
