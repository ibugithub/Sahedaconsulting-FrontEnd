'use client'

import React, { useState } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { AxiosRequests } from "../utils/axiosRequests";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormDataType {
  service: string;
  description: string;
  price: string;
  requiredFreelancer: number;
  image: File | null;
}

export const UploadService  = () => {
  const router = useRouter();
  const protectedRoute = AxiosRequests();
  const [formData, setFormData] = useState<FormDataType>({
    service: "",
    description: "",
    price: "",
    requiredFreelancer: 1,
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = `/admin/upload`;
      const response = await protectedRoute.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Service uploaded successfully");
        // Reset form after successful upload
        setFormData({
          service: "",
          description: "",
          price: "",
          requiredFreelancer: 1,
          image: null
        });
        setPreviewUrl("");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error while uploading service", error);
      toast.error("Unauthorized");
      router.push("/signin");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setFormData({ ...formData, image: selectedImage });
      const objectUrl = URL.createObjectURL(selectedImage);
      setPreviewUrl(objectUrl);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedImage = e.dataTransfer.files[0];
      setFormData({ ...formData, image: selectedImage });
      const objectUrl = URL.createObjectURL(selectedImage);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Add New Service</h1>
          <p className="mt-2 text-gray-600">Create a new service offering for freelancers</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md">
            <BounceLoader color="#3B82F6" size={60} />
            <p className="mt-4 text-gray-600">Uploading your service...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Name
                  </label>
                  <input
                    id="service"
                    type="text"
                    name="service"
                    placeholder="e.g. Logo Design"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    rows={5}
                    id="description"
                    name="description"
                    placeholder="Describe your service in detail"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      id="price"
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="requiredFreelancer"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Required Freelancers
                  </label>
                  <input
                    id="requiredFreelancer"
                    type="number"
                    min="1"
                    name="requiredFreelancer"
                    placeholder="1"
                    value={formData.requiredFreelancer}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Image
                  </label>

                  <div
                    className={`relative border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                      dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                    } ${previewUrl ? "p-2" : "p-6"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {previewUrl ? (
                      <div className="relative w-full">
                        <div className="relative aspect-video w-full rounded-md overflow-hidden mb-2">
                          <Image 
                            src={previewUrl} 
                            alt="Service preview" 
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                            unoptimized // Using unoptimized for blob URLs
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl("");
                            setFormData({ ...formData, image: null });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">Drag and drop an image or click to browse</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                      </>
                    )}
                    <input
                      id="image"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImgChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Service
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};