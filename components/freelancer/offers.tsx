'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AxiosRequests } from '../utils/axiosRequests';

const Offers = () => {
  const protectedRoute = AxiosRequests();
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    const url = '/freelancer/showOffers';
    const res = await protectedRoute.get(url);
    if (res.status === 200) {
      setOffers(res.data);
    }

  }
  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">My Offers</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map(offer => (
          <div key={offer.id} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold">{offer.title}</h2>
            <p className="text-gray-500">Client: {offer.client}</p>
            <p className="text-gray-500">Amount: {offer.amount}</p>
            <p className="text-gray-500">Status: {offer.status}</p>
            <p className="text-gray-500">Date: {offer.date}</p>

            <Link href={`/freelancer/offers/${offer.id}`}>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                View Details
              </button>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
