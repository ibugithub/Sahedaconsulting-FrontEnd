'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AxiosRequests } from '../utils/axiosRequests';
import { ProposalInterface } from '../interface';

const Offers = () => {
  const protectedRoute = AxiosRequests();
  const [offers, setOffers] = useState<ProposalInterface[]>([]);

  const fetchOffers = async () => {
    const url = '/freelancer/showOffers';
    const res = await protectedRoute.get(url);
    if (res.status === 200) {
      setOffers(res.data.offers);
    }
  }
  useEffect(() => {
    fetchOffers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">My Offers</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers && offers.map(offer => (
          offer.service && (
            <div key={offer._id} className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold">{offer.service.title}</h2>
              <p className="text-gray-500">Amount: {offer.price}</p>
              <p className="text-gray-500">Status: {offer.status}</p>
              <p className="text-gray-500">Date: {new Date(offer.createdAt).toLocaleDateString()}</p>

              <Link href={`/freelancer/offers/${offer._id}`}>
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

export default Offers;
