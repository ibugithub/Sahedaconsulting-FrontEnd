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
      const response = await axios.post(url, formData)
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
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className='text-center mb-6'>
        <span className='text-red-500'> {warning} </span>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceType">
            Service Type
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange}>
            <option value="">Select a service type...</option>
            <option value="Programming">Engineering consulting</option>
            <option value="Engineering">Management consulting</option>
            <option value="Consulting">IT Consulting</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceAs">
            Service As
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="serviceAs" name="serviceAs" value={formData.serviceAs} onChange={handleChange}>
            <option value="">Select service as...</option>
            <option value="Buyer">Buyer</option>
            <option value="Freelancer">Freelancer</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Service Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          ></textarea>
        </div>

        <div className="flex items-center justify-center">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
