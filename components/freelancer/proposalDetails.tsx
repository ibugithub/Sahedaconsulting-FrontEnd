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
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <button onClick={() => router.back()} className="text-green-600 hover:text-green-700">
              My Proposals
            </button>
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="ml-2 text-gray-500 truncate">Proposal Details</span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Proposal Details</h1>
      </div>

      {/* Main content */}
      {porposalDetails && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Status banner */}
          <div className={`px-6 py-3 ${porposalDetails.status === 'accepted'
              ? 'bg-green-50 text-green-800'
              : porposalDetails.status === 'rejected'
                ? 'bg-red-50 text-red-800'
                : 'bg-yellow-50 text-yellow-800'
            }`}>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                  porposalDetails.status === 'accepted'
                    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    : porposalDetails.status === 'rejected'
                      ? "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                } />
              </svg>
              <span className="font-medium capitalize">
                {porposalDetails.status} Proposal
              </span>
            </div>
          </div>

          {/* Job details section */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{porposalDetails.service.title}</h2>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Posted {new Date(porposalDetails.service.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>

              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Client&apos;s budget: ${porposalDetails.service.price}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Job Description</h3>
              <div className="mt-2 text-gray-600 whitespace-pre-line">
                {porposalDetails.service.description}
              </div>
            </div>
          </div>

          {/* Your proposal section */}
          <div className="px-6 py-5">
            <h3 className="text-base font-semibold text-gray-900">Your Proposal</h3>

            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <h4 className="text-xs font-medium uppercase text-gray-500">Your Bid</h4>
                <p className="mt-1 text-gray-900 font-medium">${porposalDetails.price}</p>
              </div>

              <div>
                <h4 className="text-xs font-medium uppercase text-gray-500">Submitted On</h4>
                <p className="mt-1 text-gray-900">
                  {new Date(porposalDetails.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-medium uppercase text-gray-500">Status</h4>
                <p className={`mt-1 font-medium capitalize ${porposalDetails.status === 'accepted'
                    ? 'text-green-600'
                    : porposalDetails.status === 'rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}>
                  {porposalDetails.status}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-medium uppercase text-gray-500">Cover Letter</h4>
              <div className="mt-2 text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-100 whitespace-pre-line">
                {porposalDetails.coverLetter}
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Proposals
              </button>

              {porposalDetails.status === 'pending' && (
                <button
                  className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Withdraw Proposal
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}