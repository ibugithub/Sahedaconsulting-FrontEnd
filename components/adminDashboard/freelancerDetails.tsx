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
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Top Section with Cover Background */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      
      {/* Main Content */}
      <div className="px-8 pb-8">
        {/* Profile Header with Avatar */}
        <div className="flex flex-col md:flex-row relative -mt-16 mb-6">
          <div className="md:mr-6 mb-4 md:mb-0 flex justify-center">
            <Image
              src={`${cloudinaryUrl}/${image}`}
              alt={`${firstName} ${lastName}`}
              width={140}
              height={140}
              className="rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left pt-4 md:pt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{firstName} {lastName}</h2>
                <p className="text-lg font-medium text-blue-600 mt-1">{profileTitle}</p>
                <p className="text-gray-500 mt-1">{email}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg mb-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Success Rate</p>
            <p className="text-xl font-bold text-gray-800">95%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Jobs Completed</p>
            <p className="text-xl font-bold text-gray-800">{employmentHistory.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Hours Worked</p>
            <p className="text-xl font-bold text-gray-800">1,250+</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Member Since</p>
            <p className="text-xl font-bold text-gray-800">2021</p>
          </div>
        </div>
  
        {/* Content Sections */}
        <div className="space-y-8">
          {/* Overview Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{overview}</p>
          </div>
  
          {/* Skills Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, index: number) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
  
          {/* Employment History */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Employment History</h3>
            <div className="space-y-6">
              {employmentHistory.map((job: any, index: number) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">{job.jobTitle}</h4>
                      <p className="text-blue-600">{job.company}</p>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 md:mt-0">
                      {new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-800">{address}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
