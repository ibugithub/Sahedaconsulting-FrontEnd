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
  const [proposalData, setProposalData] = useState({
    userId: '',
    service: id,
    coverLetter: '',
    price: 0,
  });

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
        const id = user.data.user._id
        setProposalData((prev) => ({
          ...prev,
          userId: id,
        }))
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
  }, []);

  const handleHire = async (e: React.FormEvent, freelancer: string, service: string) => {
    e.preventDefault();
    // if no userId navigate to singin
    if (!proposalData.userId) {
      router.push('/signin');
      toast.info('Unauthorised');
      return;
    }

    // send proposals data to add proposal
    try {
      const url = `/admin/hireFreelancer/`
      const data = { 'freelancerId': freelancer, 'serviceId': service }
      const response = await protectedRoute.post(url, data);
      if (response.status === 201) {
        setProposalData((prev) => ({
          ...prev,
          coverLetter: '',
          price: 0,
        }))
        toast.success('Hired successfully');
        await fetchDetails();
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
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
                  <Link href={`/adminDashboard/freelancerDetails/${proposal.freelancer._id}`}>
                    <div key={proposal._id} className="p-4 mb-3 bg-gray-100 rounded-lg flex justify-between items-center">
                      <div> 
                        <p className="text-gray-900 font-bold">{proposal.freelancer.user.firstName}</p>
                        <p className="text-gray-600">{proposal.freelancer.user.email}</p>
                      </div>
                      {proposal.status === 'accepted' ? (
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-md cursor-none"
                        >
                          Hired
                        </button>
                      ) : (<button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        onClick={(e) => handleHire(e, proposal.freelancer._id, service._id)}
                      >
                        Hire
                      </button>)}

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
