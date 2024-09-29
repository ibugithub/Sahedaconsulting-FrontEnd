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
      console.log('the proposals are', res.data.proposals);
    }

  }
  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">My Proposals</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proposals && proposals.map(proposal => (
          proposal.service && (
            <div key={proposal._id} className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold">{proposal.service.title}</h2>
              <p className="text-gray-500">Status: {proposal.status}</p>
              <p className="text-gray-500">Date: {new Date(proposal.createdAt).toLocaleDateString()}</p>
              <Link href={`/freelancer/proposals/${proposal._id}`}>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  View Details
                </button>
              </Link>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Proposals;
