'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

const ProposalDetail = ({params}: {params: {id:string}}) => {
  const router = useRouter();
  const id  = params.id;

  const proposal = {
    id,
    title: 'Website Development Proposal',
    description: 'This proposal covers the development of a full-stack website using modern technologies.',
    status: 'Pending',
    date: '2024-09-01',
    client: 'ABC Corp',
    amount: '$3000',
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Proposal Details</h1>
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold">{proposal.title}</h2>
        <p className="mt-2 text-gray-600">{proposal.description}</p>
        <p className="mt-4">Client: {proposal.client}</p>
        <p className="mt-1">Amount: {proposal.amount}</p>
        <p className="mt-1">Status: {proposal.status}</p>
        <p className="mt-1">Date: {proposal.date}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProposalDetail;
