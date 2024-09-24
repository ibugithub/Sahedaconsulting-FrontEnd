'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

const OfferDetail = ({params}: {params: {id: string}}) => {
  const router = useRouter();
  const id  = params.id;

  const offer = {
    id,
    title: 'Full-Stack Development Offer',
    description: 'This offer is for the development of a full-stack web application.',
    client: 'XYZ Ltd',
    amount: '$2000',
    status: 'Accepted',
    date: '2024-09-03',
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Offer Details</h1>
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold">{offer.title}</h2>
        <p className="mt-2 text-gray-600">{offer.description}</p>
        <p className="mt-4">Client: {offer.client}</p>
        <p className="mt-1">Amount: {offer.amount}</p>
        <p className="mt-1">Status: {offer.status}</p>
        <p className="mt-1">Date: {offer.date}</p>
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

export default OfferDetail;
