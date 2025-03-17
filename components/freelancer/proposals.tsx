'use client'

import React from 'react';
import Link from 'next/link';
import { AxiosRequests } from '../utils/axiosRequests';
import { useEffect, useState } from 'react';
import { ProposalInterface } from '../interface';

const Proposals = () => {
  const [proposals, setProposals] = useState<ProposalInterface[]>([]);
  const protectedRoute = AxiosRequests();
  const fetchOffers = async () => {
    const url = '/freelancer/showProposals';
    const res = await protectedRoute.get(url);
    if (res.status === 200) {
      setProposals(res.data.proposals);
    }

  }
  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8 border-b border-gray-200 pb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Proposals</h1>
          <div className="mt-3 md:mt-0 flex">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            <Link href="/findWork/">
              <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Proposal count summary */}
      <div className="mb-6 flex flex-wrap text-sm font-medium text-gray-500 gap-4">
        <span className="flex items-center">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></span>
          Pending proposals: {proposals?.filter(p => p.status === "pending").length || 0}
        </span>
        <span className="flex items-center">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-400 mr-2"></span>
          Accepted proposals: {proposals?.filter(p => p.status === "accepted").length || 0}
        </span>
        <span className="flex items-center">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></span>
          Rejected proposals: {proposals?.filter(p => p.status === "rejected").length || 0}
        </span>
      </div>

      {/* Proposals list */}
      <div className="space-y-4">
        {proposals && proposals.map(proposal => (
          proposal.service && (
            <div key={proposal._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors">
                      <Link href={`/freelancer/proposals/${proposal._id}`}>
                        {proposal.service.title}
                      </Link>
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Submitted {new Date(proposal.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${proposal.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : proposal.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </span>
                      {proposal.price && (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          ${proposal.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 flex items-center space-x-2">
                    <Link href={`/freelancer/proposals/${proposal._id}`}>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        View Details
                      </button>
                    </Link>
                    <button className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}

        {proposals?.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No proposals</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new proposal.</p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Find Jobs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default Proposals;
