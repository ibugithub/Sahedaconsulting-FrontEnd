"use client";

import React, {useCallback, useState, useEffect } from "react";
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
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceNav />
        <div className="text-red-500 text-center pb-4">
          {error}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {editingService && editingService._id === service._id ? (
                <EditService
                  key={service._id}
                  service={editingService}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ) : (
                <>
                  <Link className="text-blue-500 hover:text-blue-700 transition-colors duration-300" href={`/adminDashboard/serviceDetails/${service._id}`}>
                    {service.image !== 'noImage' && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={`${cloudinaryUrl}/${service.image}`}
                          alt="Service Image"
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {service.description.length > 100 ? `${service.description.substring(0, 100)}...` : service.description}
                      </p>
                      {service.description.length > 100 && (
                        <Link className="text-blue-500 hover:text-blue-700 transition-colors duration-300" href={`/services/${service._id}`}>
                          Read More
                        </Link>
                      )}
                      <p className="text-gray-700 font-semibold mt-5">
                        Price: ${service.price}
                      </p>
                    </div>
                  </Link>
                  <div className="p-4 flex justify-end space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                      onClick={() => handleEdit(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
