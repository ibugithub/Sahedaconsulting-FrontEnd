'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AxiosRequests } from '../utils/axiosRequests';
import { ProposalDetailsInterface } from '../interface';

export const ProposalDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const [porposalDetails, setProposalDetails] = useState<ProposalDetailsInterface>();
  useEffect(() => {
    const fetchOffer = async () => {
      const protectedRoute = AxiosRequests();
      const url = `/freelancer/showProposalDetails/${id}`;
      const response = await protectedRoute.get(url);
      console.log('the res ponse is ', response);
      try {
        if (response.status === 200) {
          setProposalDetails(response.data.proposalDetails);
        }
      } catch (err) {
        console.error('Error fetching offer details at offerDetails.tsx', err);
      }
    }
    fetchOffer();
  }, [id])

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Offer Details</h1>
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold">{porposalDetails?.service.title}</h2>
        <p className="mt-2 text-gray-600">{porposalDetails?.service.description}</p>
        <p className="mt-4">Posted: {porposalDetails?.service.createdAt?.toString()}</p>
        <p className="mt-1">Amount: {porposalDetails?.service.price}</p>
        <p className="mt-1">CoverLetter: {porposalDetails?.coverLetter}</p>
        <p className="mt-1">Your proposed price: {porposalDetails?.price}</p>
        <p className="mt-1">Your proposed at: {porposalDetails?.createdAt?.toString()}</p>
        <p className="mt-1">Status: {porposalDetails?.status}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}