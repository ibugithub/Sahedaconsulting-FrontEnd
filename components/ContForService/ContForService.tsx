'use client'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BounceLoader } from "react-spinners";

export const ContForServices = () => {
  const [warning, setWarning] = useState("");
  const [formData, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    serviceType: '',
    serviceAs: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/buyer/sendMail`

    console.log('the form data is', formData);
    if (formData.firstName === '') {
      setWarning('Please enter a first name');
      setIsLoading(false);
      return;
    }

    if (formData.email === '') {
      setWarning('Please enter a email');
      setIsLoading(false);
      return;
    }

    if (formData.lastName === '') {
      setWarning('Please enter a last name');
      setIsLoading(false);
      return;
    }

    if (formData.serviceAs === '') {
      setWarning('Please enter a serviceAs option');
      setIsLoading(false);
      return;
    }

    if (formData.serviceType === '') {
      setWarning('Please enter a serviceType option');
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(url, { formData, type: 'contactForService' });
      if (response.status === 200) {
        toast.success('An Email has been sent to the according administrator')
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          serviceType: '',
          serviceAs: '',
          description: ''
        })
      }
    } catch (error) {
      console.error("Error while sending email at ContForService.tsx file", error);
    } finally {
      setIsLoading(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#ff00ff]">Contact for Service</h2>

        {warning && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center mb-6">
            {warning}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="serviceType">
              Service Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">Select a service type...</option>
              <option value="Programming">Engineering Consulting</option>
              <option value="Engineering">Management Consulting</option>
              <option value="Consulting">IT Consulting</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Service As */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="serviceAs">
              Service As
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              id="serviceAs"
              name="serviceAs"
              value={formData.serviceAs}
              onChange={handleChange}
              required
            >
              <option value="">Select service as...</option>
              <option value="Buyer">Buyer</option>
              <option value="Freelancer">Freelancer</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="description">
              Service Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your needs..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:opacity-90 text-white font-semibold py-2 px-8 rounded-full shadow-lg transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};
