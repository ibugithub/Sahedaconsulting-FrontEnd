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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {service && (
          <div className="p-6 lg:p-8">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
            <p className="text-gray-700 text-lg mb-4">{service.description}</p>
            <div className="flex flex-wrap mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Price: ${service.price}
              </span>
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Proposals: {service.proposalsCount}
              </span>
              <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Hired: {service.hiredCount}
              </span>
              <span className="bg-yellow-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Required Freelancers: {service.requiredFreelancers}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-8">Skills: {service.skills.join(', ')}</p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Applied Freelancers</h2>
            <div className="space-y-4">
              {service.proposals.length > 0 ? (
                service.proposals.map((proposal) => (
                    <Link href={`/adminDashboard/proposals/${proposal._id}`} key={proposal._id}>
                    <div className="p-4 mb-3 bg-gray-100 rounded-lg flex justify-between items-center">
                      <div> 
                        <p className="text-gray-900 font-bold">{proposal.freelancer.user.firstName}</p>
                        <p className="text-gray-600">{proposal.freelancer.user.email}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-600">No freelancers have applied for this service yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
