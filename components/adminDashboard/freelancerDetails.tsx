"use client";
import { AxiosRequests } from "../utils/axiosRequests";
import { useEffect, useState } from "react";
import Image from "next/image";

export const FreelancerDetails = ({ id }: { id: string }) => {
  const [details, setDetails] = useState<any>({});
  const protectedRoute = AxiosRequests();
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  const getDetails = async () => {
    const url = 'admin/sendFreelancerDetails/';
    try {
      const response = await protectedRoute.post(url, { id });
      if (response.status === 200) {
        setDetails(response.data);
      }
    } catch (error) {
      console.error('Error while getting details:', error);
    }
  };

  useEffect(() => {
    getDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!details.freelancer || !details.user) return <div className="flex items-center justify-center h-screen"><div className="text-gray-500 text-lg">Loading...</div></div>;

  const {
    skills,
    address,
    phone,
    profileTitle,
    overview,
    employmentHistory,
  } = details.freelancer;

  const { firstName, lastName, email, image } = details.user;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-lg  space-y-10">
      {/* Freelancer Header */}
      <div className="flex items-center space-x-6">
        <Image
          src={`${cloudinaryUrl}/${image}`}
          alt={`${firstName} ${lastName}`}
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{firstName} {lastName}</h2>
          <p className="text-lg text-blue-600 mt-2">{profileTitle}</p>
          <p className="text-gray-500">{email}</p>
        </div>
      </div>

      {/* Overview Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-100 pb-2">Overview</h3>
        <p className="text-gray-700 mt-4 leading-relaxed whitespace-pre-line">{overview}</p>
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-100 pb-2">Skills</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {skills.map((skill: string, index: number) => (
            <span key={index} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-100 pb-2">Contact Information</h3>
        <p className="text-gray-700 mt-4"><strong className="text-gray-900">Address:</strong> {address}</p>
        <p className="text-gray-700 mt-2"><strong className="text-gray-900">Phone:</strong> {phone}</p>
      </div>

      {/* Employment History */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-100 pb-2">Employment History</h3>
        {employmentHistory.map((job: any, index: number) => (
          <div key={index} className="mt-6">
            <p className="text-gray-700"><strong className="text-gray-900">Job Title:</strong> {job.jobTitle}</p>
            <p className="text-gray-700"><strong className="text-gray-900">Company:</strong> {job.company}</p>
            <p className="text-gray-700"><strong className="text-gray-900">Duration:</strong> {new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
