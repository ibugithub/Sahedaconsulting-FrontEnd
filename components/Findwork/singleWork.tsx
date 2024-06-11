'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Service } from '../interface';
import { BounceLoader, } from "react-spinners";
import { AxiosRequests } from '../utils/axiosRequests';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const SingleWork = ({ id }: { id: string }) => {
  const protectedRoute = AxiosRequests();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [work, setWork] = useState<Service | null>(null);
  const [proposalData, setProposalData] = useState({
    userId: '',
    service: id,
    coverLetter: '',
    price: 0,
  });
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchWork = async () => {
      // Fetch Service info
      try {
        const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/findWork/showsingleWork/${id}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          const service = response.data.service;
          setWork(service);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error while fetching work at singleWork.tsx', error);
        setIsLoading(false);
      }
    }
    const fetchUserId = async () => {
      //Check whether user is authenticated and Fetch User id
      setIsLoading(true);
      try {
        const url = `/users/isAuthenticated`;
        const user = await protectedRoute.get(url);
        const id = user.data.user._id
        setProposalData((prev) => ({
          ...prev,
          userId: id,
        }))
        setIsLoading(false);
      } catch (error) {
        console.log('Error while checking authenticated user at singleWork.tsx', error);
        setIsLoading(false);
        return;
      };
    }
    fetchWork();
    fetchUserId();
  }, []);

  useEffect(() => {
    if(!proposalData.userId) return;
    const checkIsApplied = async () => {
      try {
        setIsLoading(true);
        const url = `/findWork/isApplied/`;
        const response = await protectedRoute.post(url, proposalData);
        if (response.status === 200) {
          setIsApplied(response.data.isApplied);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error while checking if user is applied:', error);
      }
    }
    checkIsApplied();
  }, [proposalData.userId, proposalData.service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if no userId navigate to singin
    if (!proposalData.userId) {
      router.push('/signin');
      toast.info('Login to submit proposal');
      return;
    }

    // send proposals data to add proposal
    try {
      const url = `/findWork/addProposal`
      const response = await protectedRoute.post(url, proposalData);
      if (response.status === 200) {
        setProposalData((prev) => ({
          ...prev,
          coverLetter: '',
          price: 0,
        }))
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
        {work && (
          <>
            <div className="p-6 lg:p-8">
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">{work.title}</h1>
              <p className="text-gray-700 text-lg mb-4">{work.description}</p>
              <div className="flex flex-wrap mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  Price: ${work.price}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  Proposals: {work.proposalsCount}
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  Hired: {work.hiredCount}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-8">Skills: {work.skills.join(', ')}</p>

              {isApplied ? (
                <div className="text-center text-green-600 font-semibold">
                  You have already applied for this service.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Cover Letter</label>
                    <textarea
                      rows={4}
                      placeholder='cover letter'
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                      value={proposalData.coverLetter}
                      onChange={(e) => setProposalData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Price</label>
                    <input
                      placeholder='price'
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                      value={proposalData.price}
                      onChange={(e) => setProposalData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold p-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                  >
                    Submit Proposal
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
