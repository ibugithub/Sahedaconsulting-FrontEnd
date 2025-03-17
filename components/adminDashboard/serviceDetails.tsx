'use client';

import { useEffect, useState } from 'react';
import { ServiceInterface, FreelancersInterface } from '../interface';
import { BounceLoader, } from "react-spinners";
import { AxiosRequests } from '../utils/axiosRequests';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export const ServiceDetails = ({ id }: { id: string }) => {
  const protectedRoute = AxiosRequests();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<ServiceInterface | null>(null);


  const fetchDetails = async () => {
    try {
      const url = `/admin/serviceDetails/${id}`;
      const response = await protectedRoute.get(url);
      if (response.status === 200) {
        const service = response.data.service;
        setService(service);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error while fetching work at singleWork.tsx', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      //Check whether user is authenticated and Fetch User id
      setIsLoading(true);
      try {
        const url = `/users/isAdministrator`;
        const user = await protectedRoute.get(url);
        console.log('the user info is ', user)
        setIsLoading(false);
      } catch (error) {
        console.log('Error while checking admin user at serviceDetails.tsx', error);
        router.push('/signin');
        toast.error('Unauthorized');
        setIsLoading(false);
        return;
      };
    }
    fetchDetails();
    fetchUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#6366f1" size={60} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {service && (
        <>
          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">{service.title}</h1>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </div>

          {/* Service Stats */}
          <div className="bg-gray-50 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-b">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Price</span>
              <span className="text-lg font-semibold text-green-600">${service.price}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Proposals</span>
              <span className="text-lg font-semibold">{service.proposalsCount}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Hired</span>
              <span className="text-lg font-semibold">{service.hiredCount}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Required Freelancers</span>
              <span className="text-lg font-semibold">{service.requiredFreelancers}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-3">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {service.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Applicants */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Applied Freelancers</h2>

            {service.proposals.length > 0 ? (
              <div className="space-y-3">
                {service.proposals.map((proposal, index) => (
                  <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                      {proposal.freelancer.user.firstName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{proposal.freelancer.user.firstName}</h3>
                      <p className="text-gray-500 text-sm">{proposal.freelancer.user.email}</p>
                    </div>

                    <button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                      <Link href={`/adminDashboard/freelancerDetails/${proposal.freelancer._id}`}>
                        View Profile
                      </Link>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                No freelancers have applied for this service yet.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
