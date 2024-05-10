"use client"

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BounceLoader, } from "react-spinners";

export const UploadService = () => {
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    price: "",
    image: null as File | unknown
  })
  const [isLoading, setIsSetLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSetLoading(true)
    try {
      const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/service/upload`
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.status === 200) {
        setIsSetLoading(false);
        toast.success("service uploaded successfully")
      }
      
    } catch (error) {
      console.error("Error While service uplaoding", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    setFormData({ ...formData, image: selectedImage });
  } 


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Let's upload some services
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <BounceLoader color="#3B82F6" size={60} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
        >
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="service"
                className="block text-gray-700 font-semibold mb-2"
              >
                Service
              </label>
              <input
                id="service"
                type="text"
                name="service"
                placeholder="Service"
                value={formData.service}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold mb-2"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-semibold mb-2"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-semibold mb-2"
              >
                Image
              </label>
              <input
                id="image"
                type="file"
                name="image"
                placeholder="image"
                accept="image/*"
                onChange={handleImgChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

