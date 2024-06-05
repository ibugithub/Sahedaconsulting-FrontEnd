"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { EditService } from "../adminDashboard/editService";
import { toast } from "react-toastify";
import { Service } from "../interface";
import { motion } from "framer-motion";
import { BounceLoader, } from "react-spinners";
import Link from "next/link";

export const FindWork = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetch = async () => {
    const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/service/showServices`
    const response = await axios.get(url);
    setServices(response.data.services);
    setIsLoading(false);
  };
  const cloudinaryUrl = "https://res.cloudinary.com/dqxxwptju/image/upload/v1714319969"

  useEffect(() => {
    const fetchServices = async () => {
      fetch();
    };
    fetchServices();
  }, []);

  const handleEdit = (service: Service) => {
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
      const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/service/del/${id}`
      await axios.delete(url);
      fetch();
      toast.success("Service deleted successfully");
    } catch (err) {
      console.error("Error deleting service", err);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
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
                  {
                    service.image !== 'noImage' && (
                      <div className="relative h-48">
                        <Image
                          src={`${cloudinaryUrl}/${service.image}`}
                          alt="Description of Image"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )
                  }
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 ">{ service.description.length > 100 ?  service.description.substring(0, 200) + "..." : service.description}</p>
                    {service.description.length > 100 && <Link href={`/services/${service._id}`} className="text-green-500"> Read More</Link>}
                    <p className="text-gray-700 font-semibold mt-5">
                      Prize: {service.price}
                    </p>
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
