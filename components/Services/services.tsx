"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { EditService } from "./editService";
import { toast } from "react-toastify";
import { Service } from "../interface";

export const ShowServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const fetch = async () => {
    const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/service/showServices`
    const response = await axios.get(url);
    setServices(response.data.services);
  };

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

  return (
    <div className="bg-white text-red-900 pl-10 pb-10">
      <h1 className="text-center"> Services </h1>
      <div>
        {services.map((service) => (
          <div key={service._id}>
            {editingService && editingService._id === service._id ? (
              <EditService
                key={service._id}
                service={editingService}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <h2 className="text-3xl">{service.title}</h2>
                <p>Description: {service.description}</p>
                <p>Prize: {service.price}</p>
                <Image
                  src={`https://res.cloudinary.com/dqxxwptju/image/upload/v1714319969/${service.image}`}
                  alt="Description of Image"
                  width={400}
                  height={200}
                />
                <div className="text-white flex gap-2">
                  <button
                    className="bg-blue-500 px-4 py-1"
                    onClick={() => {
                      handleEdit(service);
                    }}
                  >
                    {" "}
                    Edit
                  </button>
                  <button
                    className="bg-red-400 px-4 py-1"
                    onClick={() => {
                      handleDelete(service._id);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
